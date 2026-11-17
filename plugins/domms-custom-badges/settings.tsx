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
  const [image, setImage] = React.useState('')
  const [error, setError] = React.useState('')

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
        <Design.TableRowGroup title="Your custom badges">
          <Design.Text>Badges are saved on this device. Paste a direct image URL. The URL does not need a .png, .jpg or other file extension. The server must return an image that the phone can load.</Design.Text>
          <Design.TextInput label="Badge name" placeholder="My custom badge" defaultValue={label} onChange={setLabel} />
          <Design.TextInput label="Image URL" placeholder="https://example.com/image" defaultValue={image} onChange={setImage} />
          {error ? <Design.Text>{error}</Design.Text> : null}
          <Design.Button text="Add image badge" onPress={add} />
          {(settings.badges ?? []).map((badge, index) => (
            <View key={badge.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 10 }}>
              <Image source={{ uri: badge.image }} style={{ width: 28, height: 28, borderRadius: 6 }} />
              <View style={{ flex: 1 }}><Design.Text>{badge.label}</Design.Text></View>
              <Design.Button text="Remove" onPress={() => storage.set({ badges: (settings.badges ?? []).filter((_, i) => i !== index) })} />
            </View>
          ))}
        </Design.TableRowGroup>
        <Design.TableRowGroup title="Discord-style presets">
          <Design.Text>These are cosmetic profile badges only. They do not grant genuine Discord badge entitlements.</Design.Text>
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
