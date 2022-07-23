// function updatePricesCurrentSheet() {
//     var ss = SpreadsheetApp.getActiveSheet();
//     updatePrices(ss);
// }
const fileLocation = "card-data/test-cards.json";
var fs = require('fs');
let fileData = fs.readFileSync(fileLocation, 'utf-8');
let cardData = JSON.parse(fileData);

cardData.data.forEach(card => {
    console.log(card.name);
})

process.exit();

// function updatePrices(inputSheetName) {
//     var ss = inputSheetName;
//     var apiUrl = "https://api.scryfall.com/cards/";
//     var rawData = ss.getDataRange().getValues();
//     var offsetRows = 5;
//
//     var headers = rawData[offsetRows-1];
//     var headerNames = {
//         name: "Name",
//         grouping: "Grouping",
//         set: "Set",
//         cardNum: "Collector No.",
//         foil: "Foil?",
//         price: "Price",
//         owned: "Have?"
//     }
//
//     rawData.splice(0,offsetRows);
//
//     Logger.log(headers);
//     Logger.log(rawData);
//
//     rawData.forEach(function(card, cardIndex) {
//         var cardInput = {
//             name: card[headers.indexOf(headerNames.name)],
//             grouping: card[headers.indexOf(headerNames.grouping)],
//             set: card[headers.indexOf(headerNames.set)],
//             num: card[headers.indexOf(headerNames.cardNum)],
//             foil: card[headers.indexOf(headerNames.foil)],
//             price: card[headers.indexOf(headerNames.price)],
//             owned: card[headers.indexOf(headerNames.owned)],
//         }
//
//         if (cardInput.owned !== "U") {
//             var request = cardInput.set.toString().toLowerCase()+'/'+cardInput.num;
//             var cardData = cardDataCache(request, apiUrl);
//
//             if (cardInput.foil === "Y") {
//                 cardInput.price = cardData.prices.usd_foil;
//             } else if (cardInput.foil === "E") {
//                 cardInput.price = cardData.prices.usd_etched;
//             } else if (cardInput.foil === "B") {
//                 cardInput.price = Number(cardData.prices.usd) + Number(cardData.prices.usd_foil);
//             } else {
//                 cardInput.price = cardData.prices.usd;
//             }
//             var cardRow = cardIndex+offsetRows+1;
//             var cardColumn = headers.indexOf(headerNames.price)+1;
//
//             Logger.log('Row #: '+cardRow+'\nColumn #: '+cardColumn);
//
//             if (!(cardInput.price === null)) {
//                 ss.getRange(cardRow,cardColumn).setValue(cardInput.price);
//             }
//
//             Logger.log(cardInput);
//             Logger.log(cardData.name+" Prices: "+cardData.prices.usd+" Non-foil / "+cardData.prices.usd_foil+" Foil");
//         }
//     })
// }
//
// function cardDataCache(targetCard, apiUrl) {
//     Logger.log(targetCard);
//     var cache = CacheService.getScriptCache();
//     var cardData = cache.get(targetCard);
//
//     if (cardData === null) {
//         var response = UrlFetchApp.fetch(apiUrl+targetCard, {'muteHttpExceptions': true});
//         Logger.log(response);
//         cardData = response.getContentText();
//         cache.put(targetCard, cardData);
//
//         Utilities.sleep(100);
//     }
//
//     Logger.log("Logging cardData");
//     Logger.log(cardData);
//     var parsedData = JSON.parse(cardData);
//     return parsedData;
// }
//
// function createTrackerSheet() {
//     // Create the tracker sheet with all necessary formulas
//
//     // Default cell reference values
//     const cells = {
//         setName: "A1",
//         setType: "A2",
//         setCode: "B2",
//         ranges: {
//             cardName: "A6:A",
//             groupName: "B6:B",
//             setCode: "C6:C",
//             collectorNumber: "D6:D",
//             foilStatus: "E6:E",
//             cardPrice: "F6:F",
//             ownedStatus: "G6:G"
//         }
//     }
//
//     const trackerHeaders = ["Set Name", "Group", "Cards Owned", "Cost Remaining", "Current Value"];
//     const trackerName = "Collection Tracker";
//     const trackerSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(trackerName);
//     var allSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
//
//     // Grab the unique set types from each of the sheets
//     var setTypes = getUniqueSetTypes(allSheets, cells.setType);
//
//     // Clear the tracker sheet and set up the headers
//     trackerSheet.clear();
//     var trackerIndex = updateTrackerHeaders(trackerSheet, trackerName, trackerHeaders);
//
//     // Declare referenceCode, which will be used in creating the functions
//     var referenceCode = trackerIndex-1;
//
//     // Iterate through each of the set types to create each section
//     setTypes.forEach(function(cSetType) {
//         var setSheets = filterSheetsBySetType(cSetType, allSheets, cells.setType);
//         var setTypeData = [cSetType];
//         referenceCode++;
//
//         // Iterate through each sheet returned by filterSheetsBySetType() to return the needed formulas
//         setSheets.forEach(function(cSheet) {
//             var s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(cSheet);
//             var setName = s.getRange(cells.setName).getValue();
//             var groups =  getUniqueGroupNames(s, cells.ranges.groupName);
//             referenceCode++;
//
//             // Create the formulas for the "Totals" row for this sheet
//             var hCardsOwnedTotal = `=SUM(ARRAYFORMULA(COUNTIFS(${cSheet}!${cells.ranges.ownedStatus},{"Y","S"}))) & " / " & COUNTA(${cSheet}!${cells.ranges.ownedStatus})`
//             var hCostTotal = `=SUMIF('${cSheet}'!${cells.ranges.ownedStatus}, "N", '${cSheet}'!${cells.ranges.cardPrice})`
//             var hValueTotal = `=SUMIF('${cSheet}'!${cells.ranges.ownedStatus},"Y",'${cSheet}'!${cells.ranges.cardPrice})+SUMIF('${cSheet}'!${cells.ranges.ownedStatus},"S",'${cSheet}'!${cells.ranges.cardPrice})`
//
//             Logger.log("Current set is " + setName)
//
//             var setTotals = {
//                 name: setName,
//                 owned: hCardsOwnedTotal,
//                 cost: hCostTotal,
//                 value: hValueTotal
//             };
//             var setData = [setTotals];
//
//             // Iterate through each group to create the formulas for that group
//             if (groups.length > 1) {
//                 groups.forEach(function(cGroup) {
//                     referenceCode++;
//                     var cReferenceCell = "B" + referenceCode;
//
//                     Logger.log("Reference cell for " + cGroup + " is " + cReferenceCell);
//
//                     // Creating formulas for the current group
//                     var hCardsOwnedGroup = `=SUM(ARRAYFORMULA(COUNTIFS('${cSheet}'!${cells.ranges.ownedStatus},{"Y","S"},'${cSheet}'!${cells.ranges.groupName},${cReferenceCell}))) & " / " & COUNTIF('${cSheet}'!${cells.ranges.groupName},${cReferenceCell})`
//                     var hCostGroup = `=SUMIFS('${cSheet}'!${cells.ranges.cardPrice}, '${cSheet}'!${cells.ranges.ownedStatus}, "N", '${cSheet}'!${cells.ranges.groupName}, ${cReferenceCell})`
//                     var hValueGroup = `=SUMIFS('${cSheet}'!${cells.ranges.cardPrice}, '${cSheet}'!${cells.ranges.ownedStatus}, "Y", '${cSheet}'!${cells.ranges.groupName}, ${cReferenceCell}) + SUMIFS('${cSheet}'!${cells.ranges.cardPrice}, '${cSheet}'!${cells.ranges.ownedStatus}, "S", '${cSheet}'!${cells.ranges.groupName}, ${cReferenceCell})`
//
//                     var groupTotals = {
//                         name: cGroup,
//                         owned: hCardsOwnedGroup,
//                         cost: hCostGroup,
//                         value: hValueGroup
//                     }
//
//                     setData.push(groupTotals);
//                 })
//             }
//
//
//             setTypeData.push(setData);
//         })
//
//         trackerIndex += updateTrackerWithData(trackerSheet, setTypeData, trackerIndex, trackerHeaders);
//
//     })
//
//     setConditionalFormatting(trackerSheet);
//
// }
//
// function getUniqueSetTypes(sheets, setTypeCell) {
//     // KEEP THIS FUNCTION
//
//     var setTypes = [];
//
//     for (var i = 1; i < sheets.length; i++) {
//         var setType = sheets[i].getRange(setTypeCell).getValue();
//         if (!(setTypes.includes(setType))) {
//             setTypes.push(setType);
//         }
//     }
//
//     return setTypes;
// }
//
// function filterSheetsBySetType(setType, sheets, setTypeCell) {
// // KEEP THIS FUNCTION
//
//     var filteredSheets = [];
//
//     for (var i = 1; i < sheets.length; i++) {
//         var sheet = sheets[i].getName();
//         var sheetSetType = sheets[i].getRange(setTypeCell).getValue();
//
//         if (sheetSetType === setType) {
//             filteredSheets.push(sheet);
//         }
//     }
//
//     return filteredSheets;
// }
//
// function getUniqueGroupNames(sheet, groupsRange) {
//     var groups = [];
//     var groupsData = sheet.getRange(groupsRange).getValues();
//
//     for(i = 0;i < groupsData.length;i++) {
//         var group = groupsData[i][0];
//
//         if(!groups.includes(group)) {
//             groups.push(group);
//         }
//     }
//
//     return groups;
// }
//
// function updateTrackerHeaders(trackerSheet, trackerName, trackerHeaders) {
//     // KEEP THIS FUNCTION
//
//     var columns = trackerHeaders.length;
//
//     trackerSheet.getRange(1,1).setValue(trackerName);
//     trackerSheet.getRange(1,1,1,columns-2)
//         .mergeAcross()
//         .setFontSize(26);
//
//     trackerSheet.getRange(1,columns-1).setValue('="Total Value: $"&ROUNDDOWN(SUMIF(B3:B,"",E3:E),0)');
//     trackerSheet.getRange(1,columns-1,1,2)
//         .mergeAcross()
//         .setFontSize(16);
//
//     trackerHeaders.forEach(function(header, i) {
//         trackerSheet.getRange(2,i+1).setValue(header);
//     })
//
//     return 3;
// }
//
// function updateTrackerWithData(trackerSheet, data, trackerIndex, trackerHeaders) {
//     const headerIndex = {
//         setName: trackerHeaders.indexOf("Set Name")+1,
//         group: trackerHeaders.indexOf("Group")+1,
//         cards: trackerHeaders.indexOf("Cards Owned")+1,
//         neededPrice: trackerHeaders.indexOf("Cost Remaining")+1,
//         ownedPrice: trackerHeaders.indexOf("Current Value")+1
//     }
//     var row = trackerIndex;
//     var columns = trackerHeaders.length;
//
//     for (i=0;i<data.length;i++) {
//         if (i === 0) {
//             // If this is the first item in the object, then it is the Set Type name. Create a header using this name
//             trackerSheet.getRange(row,1).setValue(data[i]);
//             trackerSheet.getRange(row,1,1,columns)
//                 .mergeAcross()
//                 .setFontSize(16)
//                 .setHorizontalAlignment("center")
//                 .setBorder(true,false,false,false,false,false,null,SpreadsheetApp.BorderStyle.SOLID_THICK);
//             row++;
//         } else {
//             data[i].forEach(function(setData, setIndex) {
//                 if(setIndex === 0) {
//                     // If this is the first item in the set object, then it is the Set Totals object. Add this to the tracker
//                     Logger.log("Current set is "+setData);
//
//                     // Add the set name across the first two cells
//                     trackerSheet.getRange(row,headerIndex.setName).setValue(setData.name);
//                     trackerSheet.getRange(row,headerIndex.setName,1,2).mergeAcross();
//
//                     // Add the totals formulas to the remaining cells
//                     trackerSheet.getRange(row,headerIndex.cards).setValue(setData.owned);
//                     trackerSheet.getRange(row,headerIndex.neededPrice).setValue(setData.cost);
//                     trackerSheet.getRange(row,headerIndex.ownedPrice).setValue(setData.value);
//
//                     // Apply a border to the top of the set totals row
//                     trackerSheet.getRange(row,1,1,columns).setBorder(true,false,false,false,false,false)
//
//                     row++;
//                 } else {
//                     // If this is NOT the first item in the set object, then it is a Group Totals object. Add this to the tracker
//
//                     // Add the group name to the second cell
//                     trackerSheet.getRange(row,headerIndex.group).setValue(setData.name);
//
//                     // Add the group totals formulas to the remaining cells
//                     trackerSheet.getRange(row,headerIndex.cards).setValue(setData.owned);
//                     trackerSheet.getRange(row,headerIndex.neededPrice).setValue(setData.cost);
//                     trackerSheet.getRange(row,headerIndex.ownedPrice).setValue(setData.value);
//
//                     row++
//                 }
//             });
//         }
//     }
//
//     var returnData = row-trackerIndex;
//     return returnData;
// }
//
// function setConditionalFormatting(sheet) {
//     // var formatTypeHeader = SpreadsheetApp.newConditionalFormatRule()
//     //   .whenFormulaSatisfied('=AND(ISBLANK($B3:$E3),NOT(ISBLANK($A3)))')
//     //   .setFont
//     var formatFinishedGroups = SpreadsheetApp.newConditionalFormatRule()
//         .whenFormulaSatisfied('=AND($D3=0 , NOT(ISBLANK($B3)))')
//         .setBackground('#7fdb8b')
//         .setRanges([sheet.getRange("B3:E")])
//         .build();
//     var formatFinishedSets = SpreadsheetApp.newConditionalFormatRule()
//         .whenFormulaSatisfied('=AND($D3=0 , ISBLANK($B3), NOT(ISBLANK($C3)))')
//         .setBackground('#40a352')
//         .setBold(true)
//         .setRanges([sheet.getRange("A3:E")])
//         .build();
//     var formatStartedGroups = SpreadsheetApp.newConditionalFormatRule()
//         .whenFormulaSatisfied('=AND(NOT($D3=0) , NOT($E3=0), NOT(ISBLANK($B3)))')
//         .setBackground('#ede972')
//         .setRanges([sheet.getRange("B3:E")])
//         .build();
//     var formatStartedSets = SpreadsheetApp.newConditionalFormatRule()
//         .whenFormulaSatisfied('=AND(NOT($D3=0) , NOT($E3=0), ISBLANK($B3), NOT(ISBLANK($C3)))')
//         .setBackground('#bab63a')
//         .setBold(true)
//         .setRanges([sheet.getRange("A3:E")])
//         .build();
//     var formatUnstartedGroups = SpreadsheetApp.newConditionalFormatRule()
//         .whenFormulaSatisfied('=AND($E3=0, NOT(ISBLANK($B3)))')
//         .setBackground('#e8776f')
//         .setRanges([sheet.getRange("B3:E")])
//         .build();
//     var formatUnstartedSets = SpreadsheetApp.newConditionalFormatRule()
//         .whenFormulaSatisfied('=AND($E3=0, ISBLANK($B3), NOT(ISBLANK($C3)))')
//         .setBackground('#cf3625')
//         .setBold(true)
//         .setRanges([sheet.getRange("A3:E")])
//         .build();
//
//     var rules = sheet.getConditionalFormatRules();
//     rules.push(formatFinishedGroups);
//     rules.push(formatFinishedSets);
//     rules.push(formatStartedGroups);
//     rules.push(formatStartedSets);
//     rules.push(formatUnstartedGroups);
//     rules.push(formatUnstartedSets);
//
//     sheet.clearConditionalFormatRules();
//     sheet.setConditionalFormatRules(rules);
// }
//
// function testSpecificCards() {
//     var cards = [
//         {
//             name: "Teferi showcase 290",
//             num: 290,
//             set: "m21"
//         },
//         {
//             name: "Teferi showcase 291",
//             num: 291,
//             set: "m21"
//         },
//         {
//             name: "Teferi borderless",
//             num: 281,
//             set: "m21"
//         },
//         {
//             name: "Island showcase",
//             num: 310,
//             set: "m21"
//         },
//         {
//             name: "Grim Tutor borderless",
//             num: 315,
//             set: "m21"
//         },
//         {
//             name: "Godzilla BaB Promo",
//             num: 275,
//             set: "iko"
//         },
//         {
//             name: "Indatha Triome borderless",
//             num: 309,
//             set: "iko"
//         },
//         {
//             name: "Mothra, Supersonic Queen",
//             num: 371,
//             set: "iko"
//         },
//         {
//             name: "Japanese Art Karn",
//             num: "1★",
//             set: "war"
//         },
//         {
//             name: "B01 Plains",
//             num: "b01",
//             set: "prw2"
//         },
//         {
//             name: "Unglued Island",
//             num: 85,
//             set: "ugl"
//         },
//         {
//             name: "Pro Tour Cryptic Command",
//             num: "2020-1",
//             set: "ppro"
//         },
//         {
//             name: "Demonic Tutor (ENG MA)",
//             num: "27",
//             set: "sta"
//         },
//         {
//             name: "Demonic Tutor (JPN MA)",
//             num: "90",
//             set: "sta"
//         },
//     ]
//
//     var apiUrl = "https://api.scryfall.com/cards/";
//
//     cards.forEach(function(card) {
//         var request = card.set+'/'+card.num;
//         var response = UrlFetchApp.fetch(apiUrl+request, {'muteHttpExceptions': true});
//         var cardData = JSON.parse(response.getContentText());
//
//         Logger.log(card.name+' Frame Effects: '+cardData.frame_effects);
//         Logger.log(card.name+' Border Style: '+cardData.border_color);
//         if (card.set === "sta") {
//             Logger.log(cardData);
//         }
//
//         Utilities.sleep(100);
//     });
// }