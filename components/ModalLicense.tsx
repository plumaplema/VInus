//create a modal component to input a license
//show the modal if the license is not set
//show the modal if the license status is false
//use components from native-base
//use the useLicenseStore hook

import React, {useEffect, useState} from 'react';
import {useLicenseStore} from '../zustanstorage/license';
import {Button, Input, Text, VStack, View, useClipboard} from 'native-base';
import {Modal} from 'react-native';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

export const ModalLicense = () => {
  const [connectedToNet, setconnectedToNet] = useState<boolean | null>(false);
  const [deviceId, setdeviceId] = useState<string | null>(null);
  const [copied, setcopied] = useState(false);
  const [stat, setstat] = useState(true);
  const {onCopy} = useClipboard();
  useEffect(() => {
    NetInfo.fetch().then(state => {
      setconnectedToNet(state.isConnected);
    });
  }, []);

  const {licenseStatus, license, updateLicense, updateLicenseStatus} =
    useLicenseStore();

  const [message, setmessage] = useState<string | null>(null);

  const [status, setstatus] = useState(true);

  const checkLicense = async () => {
    const deviceId = await getUniqueId();
    setdeviceId(deviceId);
    const url = `https://licenseverifier.vercel.app/api/getlicense?build=${deviceId}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.error === 'License not found') {
      updateLicense(null);
      updateLicenseStatus(false);
      return;
    }
    if (!data.status) {
      setstatus(false);
      setmessage('License is currently not active');
    }
    if (data.license) {
      updateLicense(data.license);
      updateLicenseStatus(data.status);
      return;
    }
  };

  const registerLicense = async () => {
    const deviceId = await getUniqueId();
    const response = await fetch(
      `https://licenseverifier.vercel.app/api/register?build=${deviceId}`,
    );
    const data = await response.json();
    const {success} = data;
    if (success) {
      updateLicense(data.code);
      updateLicenseStatus(false);
      setstat(false);
      return;
    }
  };

  const runFirst = async () => {
    try {
      await checkLicense();
    } catch (e) {
      console.log(e);
      updateLicenseStatus(false);
    }
  };

  useEffect(() => {
    checkLicense();
  }, []);

  if (!connectedToNet) {
    return (
      <Modal animationType="slide" transparent={true} visible={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Text color={'red.600'}>No internet connection</Text>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal animationType="slide" transparent={true} visible={!licenseStatus}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
          {!status || !stat ? (
            <VStack space={4} alignItems={'center'}>
              <Text color={'black'}>License is currently not active</Text>
              <Text color={'black'}>
                Please contact the administrator and send this code below
              </Text>
              <Text color={'red.600'}>{deviceId}</Text>
              <Button
                disabled={copied}
                onPress={() => {
                  onCopy(deviceId ? deviceId : '');
                  setcopied(true);
                }}>
                {copied ? 'Done Copying' : 'Copy Code'}
              </Button>
            </VStack>
          ) : (
            <VStack>
              {message && status && <Text color={'red.600'}>{message}</Text>}
              {(status || stat) && (
                <Button onPress={registerLicense} mt={2}>
                  Activate the license
                </Button>
              )}
            </VStack>
          )}
        </View>
      </View>
    </Modal>
  );
};
