import Page from '@valenced/components/Page'
import { Design } from '@valenced/discord/design'
import { ScrollView, View, Image } from 'react-native'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import type { PluginSettingsComponent } from '@valenced/plugins/types'
import type { BadgeItem } from './badges'
import { DEFAULT_BADGES } from './badges'

type Settings = { badges: BadgeItem[]; showAll: boolean }
type Props = ComponentProps<PluginSettingsComponent<{ jsonStorage: Settings }>>

export default function SettingsComponent({ api: { jsonStorage: storage } }: Props) {
  const settings = storage.use() ?? { badges: [], showAll: true }
  const [label, setLabel] = useState('')
  const [image, setImage] = useState('')
  const [editing, setEditing] = useState(false)
  const add = () => {
    const name = label.trim()
    const uri = image.trim()
    if (!name || !uri) return
    const next = [...settings.badges, { id: Date.now().toString(36), label: name, image: uri, kind: 'image' as const }]
    storage.set({ badges: next })
    setLabel(''); setImage('')
  }
  return <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 28 }}>
    <Page>
      <Design.TableRowGroup title="Your profile badges">
        <Design.Text>These badges are inserted into Discord's profile badge row locally. Other people see them only if they also run this plugin and have the same badge image configured.</Design.Text>
        <Design.TableSwitchRow label="Show all profile badges" value={settings.showAll ?? true} onValueChange={showAll => storage.set({ showAll })} />
        <Design.TextInput label="Badge name" placeholder="My custom badge" defaultValue={label} onChange={setLabel} />
        <Design.TextInput label="Image URL" placeholder="https://.../badge.png" defaultValue={image} onChange={setImage} />
        <Design.Button text="Add image badge" onPress={add} />
        <Design.Text>For an image upload, upload it to Discord or an image host first, then paste its direct image URL. PNG, JPG, GIF and WebP links are supported.</Design.Text>
        {settings.badges.map((badge, index) => <View key={badge.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 10 }}>
          <Image source={{ uri: badge.image }} style={{ width: 28, height: 28, borderRadius: 6 }} />
          <View style={{ flex: 1 }}><Design.Text>{badge.label}</Design.Text></View>
          <Design.Button text="Remove" onPress={() => storage.set({ badges: settings.badges.filter((_, i) => i !== index) })} />
        </View>)}
      </Design.TableRowGroup>
      <Design.TableRowGroup title="Discord badge presets">
        <Design.Text>Choose the standard Discord-style badge artwork as a local cosmetic badge. These do not grant the real Discord entitlement.</Design.Text>
        {DEFAULT_BADGES.map(badge => <Design.Button key={badge.id} text={"Add " + badge.label} onPress={() => {
          if (settings.badges.some(item => item.id === badge.id)) return
          storage.set({ badges: [...settings.badges, badge] })
        }} />)}
      </Design.TableRowGroup>
    </Page>
  </ScrollView>
}
