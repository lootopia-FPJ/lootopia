import {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [open, setOpen] = useState(false);
  const [worldType, setWorldType] = useState('Monde Réel');
  const [items, setItems] = useState([
    {label: 'Monde Réel', value: 'Monde Réel'},
    {label: 'Monde Cartographique', value: 'Monde Cartographique'},
  ]);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Ajouter les détails du cache</Text>

          <View className="z-50 mb-3">
            <Text className="text-sm font-medium mb-1">Type de monde</Text>
            <DropDownPicker
              open={open}
              value={worldType}
              items={items}
              setOpen={setOpen}
              setValue={setWorldType}
              setItems={setItems}
              listMode="SCROLLVIEW"
              zIndex={1000}
              dropDownContainerStyle={styles.dropDownContainer}
            />
          </View>

          <ScrollView keyboardShouldPersistTaps="handled">
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-3"
              placeholder="Nom de la cache"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-3"
              placeholder="Brève description"
              placeholderTextColor="#666"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-3"
              placeholder="Nombre de couronnes"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={containsCrowns}
              onChangeText={setContainsCrowns}
            />

            <View className="flex-row justify-between mt-3">
              <TouchableOpacity
                onPress={onClose}
                className="bg-gray-400 py-3 px-5 rounded-lg flex-1 mr-2">
                <Text className="text-white text-center">Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                className="bg-emerald-600 py-3 px-5 rounded-lg flex-1 ml-2">
                <Text className="text-white text-center">Sauvegarder</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
  dropDownContainer: {
    zIndex: 1000,
  },
});
