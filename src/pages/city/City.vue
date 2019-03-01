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
      cities: {},
      hotCities: [],
      letter: ''
    }
  },
  methods: {
    getCityIndfo () {
      // axios.get(this.HOST+'/city.json')
      axios.get(this.baseURL+'city.json')
				 .then(this.handleGetCityInfoSucc)
    },
    handleGetCityInfoSucc (res) {
      console.log('city',res)

      if (res.status === 200) {
        res = res.data
        console.log('hello',res);

        this.cities = res.data.cities
        this.hotCities = res.data.hotCities
        console.log(this.hotCities);

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
