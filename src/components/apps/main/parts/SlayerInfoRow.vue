<template>
  <div>
    <h4>{{ name }}</h4>
    {{ stringifyValue }} ({{ value }})
  </div>
</template>

<script>
export default {
  name: 'SlayerInfoRow',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    stringifyValue() {
      return this.numberToKorean(this.value); 
    }
  },
  methods: {
    numberFormat(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    numberToKorean(number){
      let inputNumber  = number < 0 ? false : number;
      let unitWords    = ['', '만', '억', '조', '경'];
      let splitUnit    = 10000;
      let splitCount   = unitWords.length;
      let resultArray  = [];
      let resultString = '';

      for (let i = 0; i < splitCount; i++){
        let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0){
          resultArray[i] = unitResult;
        }
      } 

      for (let i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue;
        resultString = String(this.numberFormat(resultArray[i])) + unitWords[i] + resultString;
      }

      return resultString;
    }
  }
}
</script>

<style>

</style>