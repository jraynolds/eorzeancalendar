<template>
  <v-row class="pt-2" justify-end align-end>
    <v-col class="py-0" style="align-self: flex-end;">
      <v-select 
        :items="regions" 
        v-model="selectedRegion" 
        height="20" 
        hide-details />
    </v-col>
    <v-col class="py-0" style="align-self: flex-end;">
      <v-select 
        :items="selectedRegion" 
        v-model="selectedDatacenter" 
        height="20" 
        hide-details 
        @change="$emit('server-selected', selectedRegion.find(r => r.value == selectedDatacenter).text)" />
    </v-col>
    <v-col v-if="includeWorlds" style="align-self: flex-end;">
      <v-select 
        :items="selectedDatacenter" 
        v-model="selectedWorld" 
        height="20" 
        hide-details />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["includeWorlds", "datacenter"],
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
      selectedRegion: "",
      selectedDatacenter: "",
      selectedWorld: ""
    };
  },
  methods: {
    initialize() {
      this.selectedRegion = this.getRegionFromDatacenterName(this.datacenter).value;
      this.selectedDatacenter = this.getDatacenter(this.datacenter).value;
    },
    getRegionFromDatacenterName(datacenter) {
      for (let r of this.regions) {
        for (let d of r.value) {
          if (d.text == datacenter) return r;
        }
      }
      return null;
    },
    getDatacenter(datacenter) {
      for (let r of this.regions) {
        for (let d of r.value) {
          if (d.text == datacenter) return d;
        }
      }
      return null;
    }
  },
  beforeMount() {
    this.initialize();
  }
};
</script>