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

  const add = () => {
    const name = label.trim()
    const uri = image.trim()
    if (!name) { setError('Enter a badge name.'); return }
    if (!/^https?:\/\/\S+$/i.test(uri)) {
      setError('Enter a complete http:// or https:// image URL.')
      return
    }
    const id = 'image-' + Date.now().toString(36)
    storage.set({ badges: [...(settings.badges ?? []), { id, label: name, image: uri, kind: 'image' }] })
    setLabel('')
    setImage('')
    setError('')
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 28 }}>
      <Page>
        <Design.TableRowGroup title="Your private badges">
          <Design.Text>These badges are stored only on this device and appear only on your own profile in your Valenced app. Other Discord users cannot see them. Paste a direct image URL. The URL does not need a .png, .jpg or other file extension, as long as it returns an image.</Design.Text>
          <Design.TextInput label="Badge name" placeholder="My custom badge" value={label} onChange={setLabel} />
          <Design.TextInput label="Image URL" placeholder="https://example.com/image" value={image} onChange={setImage} />
          {error ? <Design.Text>{error}</Design.Text> : null}
          <Design.Button text="Add image badge" onPress={add} />
          {(settings.badges ?? []).map((badge, index) => (
            <View key={badge.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 10 }}>
              {badge.kind === 'image' ? <Image source={{ uri: badge.image }} style={{ width: 28, height: 28, borderRadius: 6 }} /> : null}
              <View style={{ flex: 1 }}><Design.Text>{badge.label}</Design.Text></View>
              <Design.Button text="Remove" onPress={() => storage.set({ badges: (settings.badges ?? []).filter((_, i) => i !== index) })} />
            </View>
          ))}
        </Design.TableRowGroup>
        <Design.TableRowGroup title="Discord-style presets">
          <Design.Text>Cosmetic presets only. They do not grant genuine Discord badge entitlements and remain visible only to you.</Design.Text>
          {DEFAULT_BADGES.map(badge => (
            <Design.Button key={badge.id} text={(settings.badges ?? []).some(item => item.id === badge.id) ? badge.label + ' added' : 'Add ' + badge.label} onPress={() => {
              if ((settings.badges ?? []).some(item => item.id === badge.id)) return
              storage.set({ badges: [...(settings.badges ?? []), badge] })
            }} />
          ))}
        </Design.TableRowGroup>
        <Design.TableRowGroup title="Display">
          <Design.TableSwitchRow label="Show all profile badges" value={settings.showAll ?? true} onValueChange={showAll => storage.set({ showAll })} />
        </Design.TableRowGroup>
      </Page>
    </ScrollView>
  )
}
