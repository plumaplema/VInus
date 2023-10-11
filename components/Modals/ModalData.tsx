import React from 'react'
import { Button, Modal, Text } from 'react-native'

interface ModalInterface {
    isVisible: boolean
    hideModal: () => void
}

function ModalData(props: ModalInterface) {
    const { isVisible, hideModal } = props
    return (
        <Modal animationType='slide' visible={isVisible}>
            <Text>TEST</Text>
            <Button onPress={hideModal} title='Close Modal' />
        </Modal>
    )
}

export default ModalData