<template>
	<div>
		<city-header></city-header>
		<!-- <city-search :cities="cities"></city-search> -->
		<city-list
			:cities="cities"
			:hotcities="hotCities"
			:letter="letter"
		></city-list>
		<city-alphabet
			:cities="cities"
			@change="handleLetterChange"
		></city-alphabet>
	</div>
</template>

<script>
import axios from 'axios'
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'

export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data () {
    return {
      cities: [],
      hotCities: [],
      letter: ''
    }
  },
  methods: {
    getCityIndfo () {
      axios.get(this.HOST+'/cityList?__rnd=1539342877149')
				 .then(this.handleGetCityInfoSucc)
    },
    handleGetCityInfoSucc (res) {
      // console.log(res)
      res = res.data
      if (res.status.code === 200 && res.status.desc === 'succ') {
        this.cities = res.cityData.cities
        this.hotCities = res.cityData.hotCityes
      }
    },
    handleLetterChange (letter) {
      this.letter = letter
      // console.log(letter)
    }
  },
  mounted () {
    this.getCityIndfo()
  }
}
</script>

<style lang="stylus" scoped>

</style>
