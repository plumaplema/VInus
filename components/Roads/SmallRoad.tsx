import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Rows } from 'react-native-table-component';
import { useGeneralStoreRoad } from '../../zustanstorage/generalStorage';

interface BigEyeProps { }

{/* <View style={{ borderRadius: 100, borderWidth: 2, borderColor: 'blue', width: "50%", height: '90%', margin: 4 }} /> */ }
const SmallRoad: React.FC<BigEyeProps> = () => {
    const { smallRoadCompilation } = useGeneralStoreRoad()
    const data: any = smallRoadCompilation.map((data) => data.map((content) => content === '⚪' ? <View style={{ borderRadius: 100, borderWidth: 1.5, borderColor: 'white', width: "80%", height: '90%', margin: 2 }} /> : content == '🔴' ? <View style={{ borderRadius: 100, borderWidth: 1.5, borderColor: 'red', width: "80%", height: '90%', margin: 2 }} /> : <View style={{ borderRadius: 100, borderWidth: 1.5, borderColor: 'blue', width: "80%", height: '90%', margin: 2 }} />))

    return (
        <ScrollView horizontal={true}>
            <View>
                <ScrollView style={styles.dataWrapper}>
                    <Table style={{ backgroundColor: 'white' }} borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Rows style={{ width: '100%', height: '16.66%' }} textStyle={{ fontSize: 5 }} data={data} />
                    </Table>
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
});

export default React.memo(SmallRoad);
