import { screenName } from "./screenName";

import { colors } from "./colors";
import i18n from "../../i18n";

export const dayOptions = [
  { name: "Mo", no: 10 },
  { name: "Tu", no: 11 },
  { name: "We", no: 12 },
  { name: "Th", no: 13 },
  { name: "Fr", no: 14 },
  { name: "Sa", no: 15 },
  { name: "Su", no: 16 },
];

//schedule timings
export const days = [
  {
    name: "Sun",
    translated: "sun",
    nr: 0,
    timeSlot: "Time Slots - Sunday",
    translatedTimeSlot: "timeSlotsSunday",
    timeSlotsPack: [],
  },
  {
    name: "Mon",
    translated: "mon",
    nr: 1,
    timeSlot: "Time Slots - Monday",
    translatedTimeSlot: "timeSlotsMonday",
    timeSlotsPack: [],
  },
  {
    name: "Tue",
    translated: "tue",
    nr: 2,
    timeSlot: "Time Slots - Tuesday",
    translatedTimeSlot: "timeSlotsTuesday",
    timeSlotsPack: [],
  },
  {
    name: "Wed",
    translated: "wed",
    nr: 3,
    timeSlot: "Time Slots - Wednesday",
    translatedTimeSlot: "timeSlotsWednesday",
    timeSlotsPack: [],
  },
  {
    name: "Thu",
    translated: "thu",
    nr: 4,
    timeSlot: "Time Slots - Thursday",
    translatedTimeSlot: "timeSlotsThursday",
    timeSlotsPack: [],
  },
  {
    name: "Fri",
    translated: "fri",
    nr: 5,
    timeSlot: "Time Slots - Friday",
    translatedTimeSlot: "timeSlotsFriday",
    timeSlotsPack: [],
  },
  {
    name: "Sat",
    translated: "sat",
    nr: 6,
    timeSlot: "Time Slots - Saturday",
    translatedTimeSlot: "timeSlotsSaturday",
    timeSlotsPack: [],
  },
];

//doctor profile
// export const segments = [i18n.translate("Overview"), i18n.translate("Location"), i18n.translate("Reviews")];
export const segments = [
  i18n.translate("Overview"),
  i18n.translate("Location"),
  i18n.translate("Reviews"),
];

//location

//patient appointment
// export const segment = [
//   'Appointments',
//   'Prescriptions',
//   'Medical Records',
//   'Billing',
// ];
export const segment = [
  "Appointments",
  "Patients",
  "Medical Records",
  // 'Billing',
];

//patient profile
export const patientsegments = [
  "OverView",
  "Appointments",
  "Prescriptions",
  "Medical Records",
  "Billing",
];

export const myProfilePatientSegments = [
  i18n.translate("Overview"),
  i18n.translate("upcomingAppointments"),
  i18n.translate("pastAppointments"),
];

//basic info
export const data = [
  { label: i18n.translate("male"), value: "1" },
  { label: i18n.translate("female"), value: "2" },
];

export const feedbackData = [
  { label: i18n.translate("newFunctionality"), value: "1" },
  { label: i18n.translate("problems"), value: "2" },
  { label: i18n.translate("suggestions"), value: "3" },
  { label: i18n.translate("others"), value: "4" },
];

//book appointment
export const tab = [
  { name: "Time and Date" },
  { name: "Checkout" },
  { name: "Payment" },
];

//chatList

//dashboard

//invoice view
export const tableHead = ["Description", "Quantity", "VAT", "Total"];
export const tableTitle = ["General Consultation ", "1", "$0", "$100"];
export const tableData = ["Video Call Booking ", "1", "$0", "$520"];

//pages
export const menuBarOptions = [
  { name: "Search Doctor", screenName: screenName.SearchDoctor },
  { name: "Doctor Dashboard", screenName: screenName.DoctorDashBoard },
  { name: "Doctor Profile", screenName: screenName.DoctorProfile },
  { name: "Doctor Schedule Timings", screenName: screenName.ScheduleTimings },
  { name: "favourites", screenName: screenName.FavouritesScreen },
  { name: "Profile Settings", screenName: screenName.ProfileSettings },
  { name: "Appointments", screenName: screenName.PatientAppointments },
  { name: "Patient profile Settings", screenName: screenName.ProfileSettings },
  { name: "Patients List", screenName: screenName.MyPatient },
  { name: "Patient Profile", screenName: screenName.PatientProfile },
  { name: "Patient Date Time", screenName: screenName.BookAppointment },
  { name: "Booking Success", screenName: screenName.BookingSuccess },
  { name: "invoices", screenName: screenName.InvoiceList },
  { name: "Invoice View", screenName: screenName.InvoiceView },
  { name: "Chat", screenName: screenName.ChatList },
  { name: "Chat View", screenName: screenName.ChatView },
  { name: "Voice Call", screenName: screenName.VoiceCall },
  { name: "Video Call", screenName: screenName.VideoCall },
];

export const menuOptionsAuth = [
  { name: "Login", screenName: screenName.SignInScreenClinic },
  { name: "Register", screenName: screenName.SignUpScreenClinic },
  { name: "Forgot Password", screenName: screenName.ForgotPassword },
  { name: "Change Password", screenName: screenName.ChangePassword },
];

//Doctor profile settings
export const doctorprofilesegments = [
  i18n.translate("basicInfoDoctor"),
  i18n.translate("ScheduleTimingsDoctor"),
  // 'Clinic Info',
  // 'About Me',
  // 'Contact Details',
  // 'Pricing & Services',
  // 'Education & Experience',
  // 'Awards & Memberships',
  // 'Registrations',
];

//Clinic profile settings
export const clinicprofilesegments = [
  i18n.translate("clinicInfo"),
  i18n.translate("aboutClinic"),
  i18n.translate("contactDetails"),
  // 'Basic Info',
  // 'Pricing & Services',
  // 'Education & Experience',
  // 'Awards & Memberships',
  // 'Registrations',
];

export const profilesegmentsPatient = [
  "Basic Info",
  // 'About Me',
  // 'Clinic Info',
  // 'Contact Details',
  // 'Pricing & Services',
  // 'Education & Experience',
  // 'Awards & Memberships',
  // 'Registrations',
];

//search doctor

//social media

export const genderOptions = [
  { name: "Male", type: "m", isSelected: false },
  { name: "Fem...", type: "f", isSelected: false },
];

export const specialistOptions = [
  { name: "Urology", isSelected: false },
  { name: "Cardiology", isSelected: false },
  { name: "Dentist", isSelected: false },
  { name: "Neurology", isSelected: false },
  { name: "Orthologist", isSelected: false },
  { name: "Gynaecology", isSelected: false },
];

export const patientSettingsSections = [
  {
    header: i18n.translate("preferences"),
    icon: "settings",
    items: [
      {
        icon: "perm-contact-calendar",
        color: "#24788F",
        label: i18n.translate("profileSettings"),
        screenName: screenName.ProfileSettingsPatient,
        type: "link",
      },
      // { icon: 'star', color: '#007afe', label: ,screenName: screenName.Subscription, type: 'link' },
      // { icon: 'alarm', color: '#0c0c0c', label: 'Notifications (Coming soon 🆕)', screenName: screenName.UserSettingsPatient , type: 'link' },
      {
        icon: "email",
        color: "#fe9400",
        label: i18n.translate("changeEmail"),
        screenName: screenName.ChangeEmailPatient,
        type: "link",
      },
      {
        icon: "lock-open",
        color: colors.facebook,
        label: i18n.translate("changePassword"),
        screenName: screenName.ChangePasswordPatient,
        type: "link",
      },
      {
        icon: "phone",
        color: "#32c759",
        label: i18n.translate("changePhoneNumber"),
        screenName: screenName.ChangePhonePatient,
        type: "link",
      },
      {
        icon: "trash-outline",
        color: "red",
        label: i18n.translate("deleteAccount"),
        screenName: "deleteAccount",
        type: "link",
      },
    ],
  },
  {
    header: i18n.translate("help"),
    icon: "help-circle",
    items: [
      {
        icon: "feedback",
        color: "#8e8d91",
        label: i18n.translate("feedbackContact"),
        screenName: screenName.Feedback,
        type: "link",
      },
      {
        icon: "document-text-outline",
        color: "#007afe",
        screenName: screenName.termConditionsPatients,
        label: i18n.translate("tcMessage"),
        type: "link",
      },
    ],
  },
];

export const clinicSettingsSections = [
  {
    header: i18n.translate("preferences"),
    icon: "settings",
    items: [
      // { icon: 'alarm', color: '#0c0c0c', label: 'Notifications', screenName: screenName.UserSettingsPatient , type: 'link' },
      {
        icon: "email",
        color: "#fe9400",
        label: i18n.translate("changeEmail"),
        screenName: screenName.ChangeEmailClinic,
        type: "link",
      },
      {
        icon: "lock-open",
        color: colors.facebook,
        label: i18n.translate("changePassword"),
        screenName: screenName.ChangePasswordClinic,
        type: "link",
      },
      {
        icon: "phone",
        color: "#32c759",
        label: i18n.translate("changePhoneNumber"),
        screenName: screenName.ChangePhoneClinic,
        type: "link",
      },
      {
        icon: "trash-outline",
        color: "red",
        label: i18n.translate("deleteAccount"),
        screenName: "deleteAccount",
        type: "link",
      },

      {
        icon: "logout",
        color: "red",
        label: i18n.translate("logOut"),
        screenName: screenName.SignInScreenClinic,
        type: "signout",
      },
    ],
  },
  // {
  //   header: i18n.translate("help"),
  //   icon: "help-circle",
  //   items: [
  //     {
  //       icon: "feedback",
  //       color: "#8e8d91",
  //       label: i18n.translate("feedbackContact"),
  //       screenName: screenName.ClinicFeedback,
  //       type: "link",
  //     },
  //     {
  //       icon: "document-text-outline",
  //       color: "#007afe",
  //       screenName: screenName.termConditionsClinic,
  //       label: i18n.translate("tcMessage"),
  //       type: "link",
  //     },
  //   ],
  // },
];

export const specialistList = [
  {
    id: 1,
    name: "Urology",
  },
  {
    id: 2,
    name: "Cardiology",
  },
  {
    id: 3,
    name: "Dentist",
  },
  {
    id: 4,
    name: "Neurology",
  },
  {
    id: 5,
    name: "Orthologist",
  },
  {
    id: 6,
    name: "Gynaecology",
  },
];

export const dateFormats = {
  sender: "YYYY-MM-DD",
  reciever: "DD-MM-YYYY",
};

export const sidemenuDetails = [
  {
    name: i18n.translate("myClinic"),
    screenName: screenName.ClinicDashBoard,
    iconName: "dashboard",
    iconsType: "MaterialIcons",
  },
  // {
  //   name: 'Profile Settings',
  //   screenName: screenName.ClinicProfileSettings,
  //   iconName: 'person',
  //   iconsType: 'Ionicons',
  // },
  {
    name: i18n.translate("clinicDoctors"),
    screenName: screenName.ClinicDoctors,
    iconName: "format-list-bulleted",
    iconsType: "MaterialIcons",
  },
  {
    name: i18n.translate("Appointments"),
    screenName: screenName.clinicAppointments,
    iconName: "perm-contact-calendar",
    iconsType: "MaterialIcons",
  },
  {
    name: i18n.translate("clinicPatients"),
    screenName: screenName.MyPatient,
    iconName: "format-list-bulleted",
    iconsType: "MaterialIcons",
  },

  {
    name: i18n.translate("Messenger"),
    // screenName: screenName.ChatListClinic,
    screenName: "Comming soon",
    iconName: "chatbox-ellipses-outline",
    iconsType: "Ionicons",
  },

  {
    name: i18n.translate("userSettings"),
    screenName: screenName.SettingsPage,
    iconName: "settings",
    iconsType: "Ionicons",
  },

  {
    name: i18n.translate("updateApp"),
    screenName: "Update App",
    updateLink:
      "https://play.google.com/store/apps/details?id=com.style.connect.saloon&pli=1",
    iconName: "cloud-download",
    iconsType: "Ionicons",
  },

  {
    name: i18n.translate("rateApp"),
    screenName: "Update App",
    updateLink:
      "https://play.google.com/store/apps/details?id=com.style.connect.saloon&pli=1",
    iconName: "star",
    iconsType: "Ionicons",
  },
];
// export const sidemenuDetailsClinicAccount = [

//   {
//     name: 'Terms and Conditions',
//     screenName: screenName.termConditionsClinic,
//     iconName: 'document-text-outline',
//     iconsType: 'Ionicons',
//   },
//   {
//     name: 'Feedback',
//     screenName: screenName.ClinicFeedback,
//     iconName: 'feedback',
//     iconsType: 'MaterialIcons',
//   },

//   {
//     name: 'Change Email',
//     screenName: screenName.ChangeEmailClinic,
//     iconName: 'email',
//     iconsType: 'MaterialIcons',
//   },
//   {
//     name: 'Change Password',
//     screenName: screenName.ChangePasswordClinic,
//     iconName: 'lock-closed-outline',
//     iconsType: 'Ionicons',
//   },
//   {
//     name: 'Change phone number',
//     screenName: screenName.ChangePhoneClinic,
//     iconName: 'phone',
//     iconsType: 'MaterialIcons',
//   },
// ];

export const sidemenuDetailsPatient = [
  {
    name: i18n.translate("findDoctorsClinics"),
    screenName: screenName.PatientSearchDashboard,
    iconName: "dashboard",
    iconsType: "MaterialIcons",
  },
  {
    name: "My Profile",
    screenName: screenName.myProfilePatient,
    iconName: "person",
    iconsType: "Ionicons",
  },
  // {
  //   name: 'Profile Settings',
  //   screenName: screenName.ProfileSettingsPatient,
  //   iconName: 'perm-contact-calendar',
  //   iconsType: 'MaterialIcons',
  // },

  {
    name: "Messenger",
    // screenName: screenName.ChatListPatient,
    screenName: "Comming soon",
    iconName: "message",
    iconsType: "MaterialIcons",
  },
  {
    name: "User Settings",
    screenName: screenName.SettingsPage,
    iconName: "settings",
    iconsType: "MaterialIcons",
  },

  // {
  //   name: 'Update App',
  //   screenName: "Update App",
  //   updateLink: "https://play.google.com/store/apps/details?id=com.physical.user.dictionar",
  //   iconName: 'cloud-download',
  //   iconsType: 'Ionicons',
  // },

  // {
  //   name: 'Rate App',
  //   screenName: "Update App",
  //   updateLink: "https://play.google.com/store/apps/details?id=com.physical.user.dictionar",
  //   iconName: 'star',
  //   iconsType: 'Ionicons',
  // },
];
export const sidemenuDetailsPatientGuest = [
  {
    name: i18n.translate("findDoctorsClinics"),
    screenName: screenName.PatientSearchDashboard,
    iconName: "dashboard",
    iconsType: "MaterialIcons",
  },
  {
    name: i18n.translate("myAppointments"),
    screenName: screenName.myGuestAppointments,
    iconName: "person",
    iconsType: "Ionicons",
  },
  {
    name: i18n.translate("ClinicHistoryPatient"),
    screenName: screenName.saloonHistory,
    iconName: "list-outline",
    iconsType: "Ionicons",
  },

  // {
  //   name: 'User Settings',
  //   screenName: screenName.SettingsPage,
  //   iconName: 'settings',
  //   iconsType: 'MaterialIcons',
  // },

  {
    name: i18n.translate("updateApp"),
    screenName: "Update App",
    updateLink:
      "https://play.google.com/store/apps/details?id=com.style.connect.saloon&pli=1",
    iconName: "cloud-download",
    iconsType: "Ionicons",
  },

  {
    name: i18n.translate("rateApp"),
    screenName: "Update App",
    updateLink:
      "https://play.google.com/store/apps/details?id=com.style.connect.saloon&pli=1",
    iconName: "star",
    iconsType: "Ionicons",
  },
];

// export const sidemenuDetailsPatientAccount = [

//   {
//     name: 'Terms and Conditions',
//     screenName: screenName.termConditionsPatients,
//     iconName: 'document-text-outline',
//     iconsType: 'Ionicons',
//   },

//   {
//     name: 'Set Notifications',
//     screenName: screenName.UserSettingsPatient,
//     iconName: 'alarm',
//     iconsType: 'Ionicons',
//   },
//   {
//     name: 'Feedback',
//     screenName: screenName.Feedback,
//     iconName: 'feedback',
//     iconsType: 'MaterialIcons',
//   },
//   {
//     name: 'Change Email',
//     screenName: screenName.ChangeEmailPatient,
//     iconName: 'email',
//     iconsType: 'MaterialIcons',
//   },
//   {
//     name: 'Change Password',
//     screenName: screenName.ChangePasswordPatient,
//     iconName: 'lock-open',
//     iconsType: 'MaterialIcons',
//   },

//   {
//     name: 'Change Phone Number',
//     screenName: screenName.ChangePhonePatient,
//     iconName: 'phone',
//     iconsType: 'MaterialIcons',
//   },

// ];

//schedule timing
export const timeSlotStart = [
  { label: "12:00 am", value: "1" },
  { label: "12:30 am", value: "2" },
  { label: "01:00 am", value: "3" },
  { label: "01:30 am", value: "4" },
];

export const timeSlotEnd = [
  { label: "12:00 am", value: "1" },
  { label: "12:30 am", value: "2" },
  { label: "01:00 am", value: "3" },
  { label: "01:30 am", value: "4" },
];

export const termAndConditionTextClinic = [
  { text: i18n.translate("text1") },
  { text: i18n.translate("text2") },

  { text: i18n.translate("text3") },
  { text: i18n.translate("text4") },
];
