import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

interface CacheFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  coordinates: {latitude: number; longitude: number};
  treasureHuntId: number;
}

const CacheFormModal: React.FC<CacheFormProps> = ({
  visible,
  onClose,
  onSubmit,
  coordinates,
  treasureHuntId,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [containsCrowns, setContainsCrowns] = useState('0');
  const [worldType, setWorldType] = useState('Monde Réel');

  const handleSave = () => {
    onSubmit({
      name,
      description,
      contains_crowns: parseFloat(containsCrowns),
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      treasure_hunt_id: treasureHuntId,
      world_type: worldType,
      size: 80,
      is_visible: true,
      precision_radius: 15,
      contains_artifact: 1,
      digging_enabled: true,
      digging_delay: '2 minutes',
      digging_cost: 5,
    });
    setName('');
    setDescription('');
    setContainsCrowns('0');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>World Type</Text>
            <Picker
              selectedValue={worldType}
              onValueChange={value => setWorldType(value)}
              style={styles.picker}>
              <Picker.Item label="Monde Réel" value="Monde Réel" />
              <Picker.Item
                label="Monde Cartographique"
                value="Monde Cartographique"
              />
            </Picker>
          </View>
          <ScrollView>
            <Text style={styles.title}>Add Cache Details</Text>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>World Type</Text>
              <Picker
                selectedValue={worldType}
                onValueChange={value => setWorldType(value)}
                style={styles.picker}>
                <Picker.Item label="Monde Réel" value="Monde Réel" />
                <Picker.Item
                  label="Monde Cartographique"
                  value="Monde Cartographique"
                />
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Crowns (optional)"
              keyboardType="numeric"
              value={containsCrowns}
              onChangeText={setContainsCrowns}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CacheFormModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
  },
  saveBtn: {
    backgroundColor: '#00b894',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginLeft: 8,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },

  picker: {
    height: 100,
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
});
