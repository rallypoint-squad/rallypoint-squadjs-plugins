# RallyPoint SquadJS Plugins

Here you will find different custom plugins for [SquadJS](https://github.com/Team-Silver-Sphere/SquadJS).

## Seeding Map Setter

This plugin is intended to bring more variety into the seeding layers and layers that are played after seeding
ends. Once SquadJS starts and loads the plugin, it will attempt to set the current layer to one randomly chosen
from configured options. It will also attempt to set the next layer in the same way.

Example configuration:

```json
{
    "plugin": "SeedMapSetter",
    "enabled": true,
    "seedingLayers": [
        "Logar_Seed_v1 USA WPMC",
        "Sumari_Seed_v1 USA WPMC",
        "Fallujah_Seed_v1 USA WPMC"
    ],
    "afterSeedingLayers": [
        "Narva_RAAS_v1 USA+LightInfantry RGF+LightInfantry",
        "Mutaha_RAAS_v1 USA+LightInfantry RGF+LightInfantry",
        "Harju_RAAS_v2 USA+LightInfantry RGF+LightInfantry"
    ]
}
```

## Discord Seed Call

This plugin is intended to publish discord announcement message at specified time of the day.

Example configuration:

```json
{
    "plugin": "DiscordSeedCall",
    "enabled": true,
    "discordClient": "discord",
    "channelID": "667741905228136459",
    "time": "15:00",
    "message": "Seeding has started",
    "pingGroups": ["500455137626554379"]
}
```
