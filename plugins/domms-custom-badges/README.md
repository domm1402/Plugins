# Domms Custom Badges

A JS-only Valenced plugin that adds custom image badges and cosmetic Discord-style badge presets to **your own profile on your device**.

## Features

- Add custom badges from direct HTTP or HTTPS image URLs.
- Use image URLs with or without a file extension.
- Give each badge a custom label.
- Preview the image in plugin settings and remove badges at any time.
- Add cosmetic Discord-style badge presets.
- Choose whether all your profile badges are displayed.

## Private, local-only behavior

Badges are saved in this plugin's local JSON storage. The plugin only adds them when the viewed profile belongs to the currently signed-in user. It does not modify your Discord account, upload badges, or make them visible to other Discord users. Other people will not see these badges.

Discord-style presets are cosmetic only. They do not grant genuine Discord badge entitlements.

Use a URL that returns an image. It does not need a `.png` or `.jpg` extension, but a normal webpage URL is not an image.

## Installation

Add the Domm's Valenced Plugins repository to Valenced:

```
https://domm1402.github.io/Plugins/index.json
```

Then install **Domms Custom Badges**.

## Compatibility

- Valenced API: `>=1 <2`
- Discord: `>=351.1`
- JS-only. No Discord Social SDK, native library, or Android SDK package is required.
