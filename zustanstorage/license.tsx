import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

//create a hook to store the license status
//useLicenseStore

interface LicenseTypes {
  licenseStatus: boolean;
  license: string | null;
  updateLicense: (license: string | null) => void;
  updateLicenseStatus: (status: boolean) => void;
}

export const useLicenseStore = create<LicenseTypes>()(
  devtools(
    persist(
      set => ({
        licenseStatus: false,
        license: null,
        updateLicense: (license: string | null) => set({license}),
        updateLicenseStatus: status => set(state => ({licenseStatus: status})),
      }),
      {
        name: 'license-storage',
        getStorage: () => AsyncStorage,
      },
    ),
  ),
);
