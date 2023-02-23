class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  
  updateQuality() {
    this.items.forEach(item => {
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        return;
      }
  
      let degradationFactor = 1;
      if (item.name.includes('Conjured')) {
        degradationFactor = 2;
      }
  
      if (item.name === 'Aged Brie' || item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality < 50) {
          item.quality += 1;
          if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11 && item.quality < 50) {
              item.quality += 1;
            }
            if (item.sellIn < 6 && item.quality < 50) {
              item.quality += 1;
            }
          }
        }
      } else {
        if (item.quality > 0) {
          item.quality -= degradationFactor;
          if (item.name.includes('Conjured') && item.sellIn <= 0) {
            item.quality -= degradationFactor;
          }
        }
      }
  
      item.sellIn -= 1;
  
      if (item.sellIn < 0) {
        if (item.name === 'Aged Brie') {
          if (item.quality < 50) {
            item.quality += 1;
          }
          if (item.sellIn <= 0 && item.quality > 0) {
            item.quality = 0;
          }
        } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
          item.quality = 0;
        } else {
          if (item.quality > 0) {
            item.quality -= degradationFactor;
            if (item.name.includes('Conjured')) {
              item.quality -= degradationFactor;
            }
          }
        }
      }
    });
  
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
