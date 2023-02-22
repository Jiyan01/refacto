var {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {
  it ("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    
      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];
    
    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);
    
    console.log("OMGHAI!");
    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });


  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });


  it("test unitaire", function() {
    const items = [   new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),    
                      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49),
                      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 46),
                      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 46),
                      new Item("Elixir of the Mongoose", 0, 12),
                      new Item("Elixir of the Mongoose", 0, 50),
                      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
                      new Item("Sulfuras, Hand of Ragnaros", -4, 80),
                  ];
    const gildedRose = new Shop(items);
  
    gildedRose.updateQuality();
    // Tester si la qualité augmente par 3 quand il reste 5 jours ou moins (Backstage passes)
    expect(items[0].quality).toEqual(23);
    expect(items[1].quality).toEqual(50);
    // Tester si la qualité augmente par 2 quand il reste 10 jours ou + (Backstage passes)
    expect(items[2].quality).toEqual(48);
    // Tester si la qualité tombe a 0 apres le concert (Backstage passes)
    expect(items[3].quality).toEqual(0);
    // Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
    expect(items[4].quality).toEqual(10);
    expect(items[5].quality).toEqual(48);
    // Sulfuras should not modify quality
    expect(items[6].quality).toEqual(80);
    expect(items[7].quality).toEqual(80);
  });

  // Negatif impossible
  it("should never set quality to negative", function(){
    const items = [
      new Item("Elixir of the Mongoose", 0, 12),
      new Item("Elixir of the Mongoose", 0, 50),
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ];

    const gildedRose = new Shop(items);

    for(let i = 0; i < 5; i++) {
      gildedRose.updateQuality();
    }

    items.forEach(item => expect(item.quality).toBeGreaterThanOrEqual(0));
  })

// Brie = 0 quand jour du concert est passé, mais condition non inseret dans la fonction
  it("Aged Brie increases in quality and after sellIn = 0 or less , Aged Brie = 0", function () {
    const items =[
      new Item("Aged Brie", 2, 0),
      new Item("Aged Brie", -1, 10),
    ]
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
    expect(items[1].quality).toEqual(0);
  })

// Ne doit pas exceder les 50
  it("sould not allow quality to exceed 50", function() {
    const items = [
      new Item("Aged Brie", 2, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 50),
    ]

    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
    expect(items[1].quality).toEqual(50);
  })

  // conjured
  it("sould not allow quality to exceed 50", function() {
    const items = [
      new Item("Conjured Aged Brie", 2, 40),
      new Item("Conjured Backstage passes to a TAFKAL80ETC concert", 12, 40),
    ]

    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toEqual(38);
    expect(items[1].quality).toEqual(38);
  })


});
