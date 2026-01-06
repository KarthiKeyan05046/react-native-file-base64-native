import { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { encodeFile } from 'react-native-file-base64-native';

export default function App() {
  const [filePath, setFilePath] = useState<string>('');
  const [base64Result, setBase64Result] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleEncode = async () => {
    if (!filePath.trim()) {
      Alert.alert('Error', 'Please enter a file path');
      return;
    }

    try {
      setLoading(true);
      const base64 = await encodeFile(filePath.trim());
      setBase64Result(
        base64.substring(0, 200) + (base64.length > 200 ? '...' : '')
      );
      Alert.alert('Success', 'File encoded successfully!');
    } catch (error: any) {
      Alert.alert('Error', `Failed to encode file: ${error?.message || error}`);
      setBase64Result('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Base64 Encoder</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter file path (e.g., /path/to/file.jpg or file:///path/to/file.jpg)"
        value={filePath}
        onChangeText={setFilePath}
        editable={!loading}
      />
      <Button
        title={loading ? 'Encoding...' : 'Encode File'}
        onPress={handleEncode}
        disabled={loading}
      />
      {base64Result ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Base64 (first 200 chars):</Text>
          <Text style={styles.resultText}>{base64Result}</Text>
        </View>
      ) : (
        <Text style={styles.placeholder}>No file encoded yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  resultContainer: {
    marginTop: 20,
    width: '100%',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  placeholder: {
    marginTop: 20,
    color: '#999',
    fontStyle: 'italic',
  },
});
