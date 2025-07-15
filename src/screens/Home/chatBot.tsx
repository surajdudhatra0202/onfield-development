import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FlatList, Image, SafeAreaView, StyleProp, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalView, Text, EmptyComponent } from '@components';
import { Colors, Strings, StorageKey, Fonts, Dimens, ImageView } from '@constants';
import { Post } from '@services';
import { CHAT, CHAT_ADD, PrefManager, showPopupMessage } from '@utils';
import styles from './styles';
import c from '@style';
import type { AuthData, ApiResponse } from '@/types/global';

interface ChatBotProps {
  chatEnable: boolean;
   onClose: () => void; 
}

interface renderMessageProps {
  type: number,
  msg: string
}

const ChatBot = ({ chatEnable, onClose }: ChatBotProps) => {
  // const [chatEnable, setChatEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    getHistoryChat();
  }, []);

  const getHistoryChat = async () => {
    try {
      setLoading(true);
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      const request = { user_id: authData.id };
      const { data, message } = (await Post(CHAT, request)) as ApiResponse;

      if (data.status) {
        setMessages(data?.data?.message ?? []);
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    try {
      setLoading(true);
      
      const authData: AuthData = await PrefManager.getValue(StorageKey.userInfo);
      const request = { user_id: authData.id, msg: inputMessage };
      const userMsg = { msg: inputMessage, l_date: new Date(), type: 2 };

      setMessages(prev => [...prev, userMsg]);
      setTyping(true);
      setInputMessage('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      const { data, message } = (await Post(CHAT_ADD, request)) as ApiResponse;
      if (data.status) {
          const reply = { msg: data.reply, l_date: new Date(), type: 1 };
          setMessages(prev => [...prev, reply]);
      } else {
        showPopupMessage(Strings.error, data?.message ?? message, true);
      }
    } catch (e) {
      showPopupMessage(Strings.error, String(e), true);
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  const renderMessage = useCallback(({ item }: {item: renderMessageProps}) => (
    <View style={bubbleWrapper(item.type !== 1)}>
      <View style={bubbleStyle(item.type !== 1)}>
        <Text title={item.msg} style={bubbleText(item.type !== 1)} />
      </View>
    </View>
  ), []);

  const listEmptyComponent = () => !loading && <EmptyComponent title={Strings.noData} />;
  const botFooter = () => typing && (
    <View style={styles.dotLoaderStyle}>
      <DotIndicator color={Colors.primary} size={7} />
    </View>
  );

  return (
    <ModalView visible={chatEnable} onClose={onClose}>
      <SafeAreaView style={c.flex1}>
        <View style={c.botFlex}>
          <View style={c.botViewStyle}>
            <View style={styles.chatContainerView}>
              <Text title={Strings.yourAIAssistantText} style={c.textSemiBold14} />
            </View>

            <View style={c.botHeaderStyle}>
              <Image
                resizeMode="contain"
                style={styles.botHeaderImageSize}
                source={ImageView.logoWhite}
              />
            </View>

            <FlatList
              nestedScrollEnabled
              ref={flatListRef}
              data={messages}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderMessage}
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
              ListFooterComponent={botFooter}
              ListEmptyComponent={listEmptyComponent}
            />

            <View style={styles.innerchatContainerView}>
              <View style={c.flexRowSpaceBetweenPadding0}>
                <TextInput
                  style={styles.innerChatContainer}
                  selectionColor={Colors.black}
                  placeholder={Strings.typeYourNameHere}
                  placeholderTextColor={Colors.darkGrey}
                  onChangeText={setInputMessage}
                  value={inputMessage}
                />
                <TouchableOpacity
                  disabled={inputMessage === ''}
                  style={c.marginRight12}
                  onPress={sendMessage}
                >
                  <FontAwesome
                    name="paper-plane"
                    size={24}
                    color={inputMessage === '' ? Colors.darkGrey : Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={c.triangle} />
          </View>

          <TouchableOpacity onPress={onClose} style={c.floatingCrossStyle}>
            <Icon name="close" size={30} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ModalView>
  );
};

export default ChatBot;

// Helper styles
const bubbleWrapper = (isRight: boolean): StyleProp<ViewStyle> => ({
  alignSelf: isRight ? 'flex-end' : 'flex-start',
  maxWidth: '70%',
});

const bubbleStyle = (isRight: boolean): StyleProp<ViewStyle> => ({
  alignSelf: isRight ? 'flex-end' : 'flex-start',
  backgroundColor: isRight ? Colors.chatRight : Colors.chatLeft,
  margin: 5,
  borderRadius: 10,
  padding: 5,
});

const bubbleText = (isRight: boolean) => ({
  fontFamily: isRight ? Fonts.Bold : Fonts.Regular,
  fontSize: Dimens.f16,
  color: isRight ? Colors.primary : Colors.black,
  paddingHorizontal: 8,
});
