import Realm from 'realm';
import { DrawerMenu } from './Auth/schemas';

export const realm = new Realm({
  schema: [DrawerMenu],
  deleteRealmIfMigrationNeeded: true,
});
