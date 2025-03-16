import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme, Avatar, Button, Card, Text } from 'react-native-paper';

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Card>
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
          <Card.Content>
            <Text variant="bodyLarge">Card content</Text>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
          <Card.Content>
            <Text variant="bodyLarge">Card content</Text>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    marginTop: 16,
  },
});