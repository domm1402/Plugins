import Page from '@valenced/components/Page'
import { Design } from '@valenced/discord/design'
import { ScrollView, View, Image } from 'react-native'
import { useState, type ComponentProps } from 'react'
import type { PluginSettingsComponent } from '@valenced/plugins/types'
import type { BadgeItem } from './badges'
import { DEFAULT_BADGES } from './badges'

type Settings = { badges: BadgeItem[]; showAll: boolean }
type Props = ComponentProps<PluginSettingsComponent<{ jsonStorage: Settings }>>

export default function SettingsComponent({ api: { jsonStorage: storage } }: Props) {
  const settings = storage.use() ?? { badges: [], showAll: true }
  const [label, setLabel] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const badges = settings.badges ?? []

  const addImage = () => {
    const name = label.trim()
    const uri = image.trim()
    if (!name) { setError('Enter a badge name.'); return }
    if (!/^https?:\/\/\S+$/i.test(uri)) {
      setError('Enter a complete http:// or https:// image URL.')
      return
    }
    const id = 'image-' + Date.now().toString(36)
    storage.set({ badges: [...badges, { id, label: name, image: uri, kind: 'image', description: name }] })
    setLabel('')
    setImage('')
    setError('')
  }

  const togglePreset = (badge: BadgeItem) => {
    const exists = badges.some(item => item.id === badge.id)
    storage.set({ badges: exists ? badges.filter(item => item.id !== badge.id) : [...badges, badge] })
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
      <Page>
        <Design.TableRowGroup title="Your badge collection">
          <Design.Text>{badges.length} badges selected. Tap a badge in your profile to open its details. These are local cosmetic badges and do not grant genuine Discord entitlements.</Design.Text>
          {badges.map((badge, index) => (
            <View key={badge.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 7, gap: 10 }}>
              <Image source={{ uri: badge.image }} style={{ width: 32, height: 32, borderRadius: 7 }} />
              <View style={{ flex: 1 }}><Design.Text>{badge.label}</Design.Text></View>
              <Design.Button text="Remove" onPress={() => storage.set({ badges: badges.filter((_, i) => i !== index) })} />
            </View>
          ))}
          {badges.length === 0 ? <Design.Text>No badges added yet. Choose presets below or add your own image.</Design.Text> : null}
        </Design.TableRowGroup>

        <Design.TableRowGroup title="Badge library">
          <Design.Text>{DEFAULT_BADGES.length} badge designs available. Add as many as you want. Added badges appear in your profile badge row; tap one there to open its details.</Design.Text>
          {DEFAULT_BADGES.map(badge => {
            const selected = badges.some(item => item.id === badge.id)
            return (
              <View key={badge.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, gap: 8 }}>
                <Image source={{ uri: badge.image }} style={{ width: 30, height: 30, borderRadius: 6 }} />
                <View style={{ flex: 1 }}><Design.Text>{badge.label}</Design.Text></View>
                <Design.Button text={selected ? 'Added' : 'Add'} onPress={() => togglePreset(badge)} />
              </View>
            )
          })}
        </Design.TableRowGroup>

        <Design.TableRowGroup title="Create an image badge">
          <Design.Text>Use any direct HTTP or HTTPS image URL. The URL does not need a .png or .jpg extension, but the server must return an image.</Design.Text>
          <Design.TextInput label="Badge name" placeholder="My custom badge" value={label} onChange={setLabel} />
          <Design.TextInput label="Image URL" placeholder="https://example.com/image" value={image} onChange={setImage} />
          {error ? <Design.Text>{error}</Design.Text> : null}
          <Design.Button text="Add image badge" onPress={addImage} />
        </Design.TableRowGroup>

      </Page>
    </ScrollView>
  )
}
