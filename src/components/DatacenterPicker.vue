<template>
  <v-row class="pt-2" justify-end align-end>
    <v-col class="py-0" style="align-self: flex-end;">
      <v-select 
        :items="regions" 
        v-model="selectedRegion" 
        height="20" 
        hide-details
        @change="$emit('region-selected', regions.find(r => r.value == selectedRegion).text)" />
    </v-col>
    <v-col class="py-0" style="align-self: flex-end;">
      <v-select 
        :items="selectedRegion" 
        v-model="selectedServer" 
        height="20" 
        hide-details 
        @change="$emit('server-selected', selectedRegion.find(r => r.value == selectedServer).text)" />
    </v-col>
    <v-col v-if="includeWorlds" style="align-self: flex-end;">
      <v-select 
        :items="selectedServer" 
        v-model="selectedDatacenter" 
        height="20" 
        hide-details 
        @change="$emit('datacenter-selected', selectedDatacenter)" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["includeWorlds"],
  data() {
    let regions = [
      {
        text: "North America",
        value: [
          {
            text: "Crystal",
            value: [
              "Balmung",
              "Brynhildr",
              "Coeurl",
              "Diabolos",
              "Goblin",
              "Malboro",
              "Mateus",
              "Zalera"
            ]
          },
          {
            text: "Aether",
            value: [
              "Adamantoise",
              "Cactuar",
              "Faerie",
              "Gilgamesh",
              "Jenova",
              "Midgardsormr",
              "Sargatanas",
              "Siren"
            ]
          },
          {
            text: "Primal",
            value: [
              "Behemoth",
              "Excalibur",
              "Exodus",
              "Famfrit",
              "Hyperion",
              "Lamia",
              "Leviathan",
              "Ultros"
            ]
          }
        ]
      },
      {
        text: "Japan",
        value: [
          {
            text: "Elemental",
            value: [
              "Aegis",
              "Atomos",
              "Carbuncle",
              "Garuda",
              "Gungnir",
              "Kujata",
              "Ramuh",
              "Tonberry",
              "Typhon",
              "Unicorn"
            ]
          },
          {
            text: "Gaia",
            value: [
              "Alexander",
              "Bahamut",
              "Durandal",
              "Fenrir",
              "Ifrit",
              "Ridill",
              "Tiamat",
              "Ultima",
              "Valefor",
              "Yojimbo",
              "Zeromus"
            ]
          },
          {
            text: "Mana",
            value: [
              "Anima",
              "Asura",
              "Belias",
              "Chocobo",
              "Hades",
              "Ixion",
              "Mandragora",
              "Masamune",
              "Pandaemonium",
              "Shinryu",
              "Titan"
            ]
          }
        ]
      },
      {
        text: "Europe",
        value: [
          {
            text: "Chaos",
            value: [
              "Cerberus",
              "Louisoix",
              "Moogle",
              "Omega",
              "Ragnarok",
              "Spriggan"
            ]
          },
          {
            text: "Light",
            value: [
              "Lich", 
              "Odin", 
              "Phoenix", 
              "Shiva", 
              "Twintania", 
              "Zodiark"
            ]
          }
        ]
      }
    ];
    return {
      regions: regions,
      selectedRegion: regions[0].value,
      selectedServer: regions[0].value[0].value,
      selectedDatacenter: regions[0].value[0].value[0]
    };
  }
};
</script>