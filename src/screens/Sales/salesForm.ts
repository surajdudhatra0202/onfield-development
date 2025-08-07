import { FieldData } from '@/types/global';

const salesForm: FieldData[] = [
  {
    required: 1,
    name: 'purpose_of_visit',
    label: 'Purpose of Visit',
    type: 'dropdown',
    value: '',
    options: [
      'Order Collection',
      'Payment Collection',
      'New Dealer Appointment',
      'Project Inquiry',
      'Overdue Payment Followup',
      'Complaint Call',
      'Others',
    ],
  },
  {
    required: 1,
    name: 'call_details',
    label: 'Other Purpose of Visit',
    type: 'textarea',
    value: '',
  },
  {
    required: 1,
    name: 'contact_person',
    label: 'Contact Person',
    type: 'dropdown',
    value: '',
    options: ['Person 1', 'Sales User', 'User 2'],
  },
  {
    required: 1,
    name: 'call_date',
    label: 'Call Date',
    type: 'date',
    value: '',
  },
  {
    required: 1,
    name: 'priority',
    label: 'Priority',
    type: 'dropdown',
    options: ['High', 'Medium', 'Low'],
    value: '',
  },
];

export default salesForm;
