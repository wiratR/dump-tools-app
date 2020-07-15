import arrayBufferToHex from 'array-buffer-to-hex';
import * as utils from './utils.js';
import * as basetypes from './baseTypes.js';

const File_Identifier = ['PDF', 'FBL', 'PBL', 'CBL', 'AVQ', 'CSP', 'CTP', 'SDP', 'BCP', 'BPP', 'HPT', 'LOC', 'OPA', 'SQL'];
const parameterDef = {
  "MRT_PDF" : {
    FileId          : 101,
    Description     : "Parameter Description File at L4"
  },
  "CCS_PDF" : {
    FileId          : 102,
    Description     : "Parameter Description File at CCS"
  },
  "MRT_AVQ" : {
    FileId          : 104,
    Description     : "Add Value Quota Table at L4"
  },
  "CCS_AVQ" : {
    FileId          : 104,
    Description     : "Add Value Quota Table at CCS"
  },
  "MRT_CSP" : {
    FileId          : 105,
    Description     : "Card Sale Parameter Table"
  },
  "MRT_CTP" : {
    FileId          : 106,
    Description     : "Common Transit Pass Scheme Table"
  },
  "CCS_SDP" : {
    FileId          : 108,
    Description     : "System Device Parameter Table"
  },
  "MRT_BCP" : {
    FileId          : 110,
    Description     : "MRT Card Promotion Scheme Table"
  },
  "MRT_BPP" : {
    FileId          : 111,
    Description     : "MRT CTP Promotion Scheme Table"
  },
  "MRT_HPT" : {
    FileId          : 114,
    Description     : "Holder Profile Table"
  },
  "MRT_SQL" : {
    FileId          : 115,
    Description     : "SQLite database generated at MRT L4"
  },
  "CCS_SQL" : {
    FileId          : 116,
    Description     : "SQLite database generated at CCS"
  },
  "MRT_LOC" : {
    FileId          : 117,
    Description     : "Location Table generated at MRT L4"
  },
  "CCS_OPA" : {
    FileId          : 119,
    Description     : "Operator Access Table generated at CCS"
  },
  "MRT_FBL" : {
    FileId          : 120,
    Description     : "Full Card Blacklist Table"
  },
  "MRT_PBL" : {
    FileId          : 121,
    Description     : "Partial Card Blacklist Table"
  },
  "MRT_CBL" : {
    FileId          : 122,
    Description     : "MRT Equipment ID Blacklist Table"
  }
};

function isValidPdType(pdType) {
  var len = Buffer.byteLength(pdType);
  //console.log("isValidPdType : input = " + pdType + " length = " + len);
  if ( len != 4) {
    return false;
  }else{
    var pdTypeId = pdType.substring(0,3);
    //console.log("isValidPdType : pdTypeId = " + pdTypeId );
    //console.log("isValidPdType : File Identifier Length = " + File_Identifier.length );
    var index = 0;
    for(index ; index < File_Identifier.length; index++) {
      //console.log("isValidPdType : FileId index " + index + " value = " + File_Identifier[index]); 
      if (pdTypeId == File_Identifier[index]) {
        //console.log("isValidPdType : isValid" );
        return true;
      }
    }
    //console.log("isValidPdType : not isValid" );
    return false;
  }
}   

function getPdTypeId(pdFile) {
  //var len = Buffer.byteLength(pdFile);
  var pdFileKey = pdFile.substring(0,7);
  //console.log("getPdTypeId : file key " + pdFileKey );
  for (let [key, value] of Object.entries(parameterDef)){
    if ( key == pdFileKey ) {
      //console.log("getPdTypeId : " + JSON.stringify(value,null,2));
      var typeId = value.FileId;
      //console.log("getPdTypeId : Type Id = " + typeId);
      //return (value) 
      return typeId;
    }
  }
  //return null;
  return 0;
}

function PNRIndicator_t(value) {
    var outStr;
    switch (value){
        case 0 : outStr = "Not PNR CSC";
        break;
        case 1 : outStr = "PNR CSC";
        break;
        default : outStr = "Unspecified";
        break;
    };
    return outStr;
}

function AuthorisedIndicator_t(value) {
    var outStr;
    switch (value){
        case 0 : outStr = "Not Authorised";
        break;
        case 1 : outStr = "Authorised";
        break;
        default : outStr = "Unspecified";
        break;
    };
    return outStr;
}

function RoleID_t(value) {
    var outStr;
    switch (value){
        case 1 : outStr = "Supervisor";
        break;
        case 2 : outStr = "Operator";
        break;
        case 3 : outStr = "Maintenance";
        break;
        case 4 : outStr = "Automatic Operator";
        break;
        case 5 : outStr = "Finance";
        break;
        default : outStr = "Unspecified";
        break;
    };
    return value+"-"+outStr;
}

function PD_FileHeader_t(buffer) {
  var offset = 0; 
  var FileID                  = new Uint8Array (buffer.slice(offset , offset + 1));  offset = offset + 1;    // 1 bytes
  var IssuerID                = new Uint8Array (buffer.slice(offset , offset + 1));  offset = offset + 1;    // 1 bytes
  var ServiceProviderID       = new Uint16Array(buffer.slice(offset , offset + 2));  offset = offset + 2;    // 2 bytes
  var EffectiveDateAndTime    = new Uint32Array(buffer.slice(offset , offset + 4));  offset = offset + 4;    // 4 bytes
  var MajorVersion            = new Uint16Array(buffer.slice(offset , offset + 2));  offset = offset + 2;    // 2 bytes
  var MinorVersion            = new Uint8Array (buffer.slice(offset , offset + 1));  offset = offset + 1;    // 1 bytes
  var Length                  = new Uint32Array(buffer.slice(offset , offset + 4));  offset = offset + 4;    // 4 bytes
  var PayLoadVersion          = new Uint8Array (buffer.slice(offset , offset + 1));  offset = offset + 1;    // 1 bytes
  var FileHeader_t = {
    "FileHeader" : {
      "FileID"                : FileID[0],   
      "IssuerID"              : IssuerID[0],   
      "ServiceProviderID"     : ServiceProviderID[0],
      "EffectiveDateAndTime"  : utils.dateFormat(EffectiveDateAndTime[0]),
      "MajorVersion"          : MajorVersion[0],
      "MinorVersion"          : MinorVersion[0],
      "Length"                : Length[0],
      "PayLoadVersion"        : PayLoadVersion[0]
    }
  }
  return FileHeader_t;
}

function PD_FileTrailer_t(buffer) {
  var crc32 = new Uint32Array(buffer.slice(0, 4)); // 4 bytes
  var checkSum32 = { 
    "FileTrailer" : {
      "CRC32"     : crc32[0]
      //"CRC32"  : arrayBufferToHex(buffer.slice(offSet, offSet+4))
    }
  };
  return  checkSum32;
}
// 5.1 Parameter Description File 
function PDFDetails_t(buffer) {
  var offset = 0;
  var numberOFfile = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;
  //console.log( "PDFDetails_t : numver of file = " + numberOFfile);
  var index;
  var ParameterFileDescription = [];
  for ( index = 0 ; index < numberOFfile; index++) {
    var objectResult = {};
    var FileID                  = new Uint8Array (buffer.slice(offset, offset + 1));    offset = offset + 1;    // 1 bytes
    var Filename                = buffer.slice(offset, offset + 12);                    offset = offset + 12;   // 12 bytes
    var MajorVersion            = new Uint16Array(buffer.slice(offset , offset + 2));   offset = offset + 2;    // 2 bytes
    var MinorVersion            = new Uint8Array (buffer.slice(offset , offset + 1));   offset = offset + 1;    // 1 bytes
    var LocationPath            = buffer.slice(offset, offset + 32);                    offset = offset + 32;   // 32 bytes    
    var EffectiveDateAndTime    = new Uint32Array(buffer.slice(offset , offset + 4));   offset = offset + 4;    // 4 bytes
    objectResult = {
      "FileID"                :   FileID[0],
      "Filename"              :   utils.hexToAscii(arrayBufferToHex(Filename)),
      "MajorVersion"          :   MajorVersion[0],
      "MinorVersion"          :   MinorVersion[0],
      "LocationPath"          :   utils.hexToAscii(arrayBufferToHex(LocationPath)),
      "EffectiveDateAndTime"  :   utils.dateFormat(EffectiveDateAndTime[0])
    };
    ParameterFileDescription[index] = objectResult;
  }
  var pdfDetails = {
    "ParameterData" : {
      "numberOFfile"  : numberOFfile[0],
      ParameterFileDescription,
    }
  }
  return pdfDetails;
}
// 5.2 System Device Parameter Table
// 5.3 Add Value Quota Table
function AVQDetails_t(buffer) {
  var offset = 0;
  var NumberOfAVQDescriptions = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;
  var index;
  var AddValueQuotaDescriptions = [];
  for(index = 0; index < NumberOfAVQDescriptions; index++){
    var objectResult = {};
    var EquipmentTypeAcronym        = buffer.slice(offset, offset + 3);                     offset = offset + 3;    // 3 bytes
    var AddValueQuotaValue          = new Uint32Array(buffer.slice(offset , offset + 4));   offset = offset + 4;    // 4 bytes
    var AddValueQuotaDescription    = buffer.slice(offset, offset + 12);                    offset = offset + 12;   // 12 bytes
    objectResult = {
        "EquipmentTypeAcronym"      : utils.hexToAscii(arrayBufferToHex(EquipmentTypeAcronym)),
        "AddValueQuotaValue"        : AddValueQuotaValue[0],
        "AddValueQuotaDescription"  : utils.hexToAscii(arrayBufferToHex(AddValueQuotaDescription))
    };
    AddValueQuotaDescriptions[index] = objectResult;
  }
  var avqDetails = {
    "ParameterData" : {
      "NumberOfAVQDescriptions"  : NumberOfAVQDescriptions[0],
      AddValueQuotaDescriptions
    }
  }
  return avqDetails;
}
// 5.4 Card Sales Parameter Table
function CSPDetails_t(buffer) {
  var offset = 0;
  var NumberOfCSPDescriptions = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;
  var index;
  var CardSaleDescriptions = [];
  for(index = 0; index < NumberOfCSPDescriptions; index++){
    var objectResult = {};
    var MediaTypeID                     = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var CardTypeId                      = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var CardTypeDescription             = buffer.slice(offset, offset + 32);                       offset = offset + 32;   // 32 bytes
    var PNRIndicator                    = new Uint8Array (buffer.slice(offset,  offset + 1));      offset = offset + 1;    // 1 byte
    var MinimumPurseStoredValue         = new Uint32Array(buffer.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
    var MaximumPurseStoredValue         = new Uint32Array(buffer.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
    var PurseAddValueMultiplier1        = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var PurseAddValueMultiplier2        = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var PurseAddValueMultiplier3        = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var PurseAddValueMultiplier4        = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var PurseRefundAuthorisedIndicator  = new Uint8Array (buffer.slice(offset,  offset + 1));      offset = offset + 1;    // 1 byte
    var CardSaleAddValueAmount          = basetypes.ValueOneUnitUnsigned_t(buffer.slice(offset, offset + 3)); offset = offset + 3; // 3 bytes
    var RefundServiceCharge             = new Uint32Array(buffer.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
    var ReplacementServiceCharge        = new Uint32Array(buffer.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
    var DepositAmount                   = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var IssuanceServiceCharge           = new Uint32Array(buffer.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
    var LastUsageValidityPeriod         = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var ValidityDuration                = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var EmployeeCardCheck               = new Uint8Array (buffer.slice(offset,  offset + 1));      offset = offset + 1;    // 1 byte
    var SalePermitted                   = new Uint8Array (buffer.slice(offset,  offset + 1));      offset = offset + 1;    // 1 byte
    var UsedForExitOnly                 = new Uint8Array (buffer.slice(offset,  offset + 1));      offset = offset + 1;    // 1 byte
    var ConcessionFlag                  = new Uint8Array (buffer.slice(offset,  offset + 1));      offset = offset + 1;    // 1 byte
    var DisplayLight                    = new Uint8Array (buffer.slice(offset,  offset + 1));      offset = offset + 1;    // 1 byte
    var DeviceTone                      = new Uint8Array (buffer.slice(offset,  offset + 1));      offset = offset + 1;    // 1 byte
    objectResult = {
        "MediaTypeID"                     : MediaTypeID[0],
        "CardTypeId"                      : CardTypeId[0],
        "CardTypeDescription"             : utils.hexToAscii(arrayBufferToHex(CardTypeDescription)),
        "PNRIndicator"                    : PNRIndicator_t(PNRIndicator[0]),
        "MinimumPurseStoredValue"         : MinimumPurseStoredValue[0],
        "MaximumPurseStoredValue"         : MaximumPurseStoredValue[0],
        "PurseAddValueMultiplier1"        : PurseAddValueMultiplier1[0],
        "PurseAddValueMultiplier2"        : PurseAddValueMultiplier2[0],
        "PurseAddValueMultiplier3"        : PurseAddValueMultiplier3[0],
        "PurseAddValueMultiplier4"        : PurseAddValueMultiplier4[0],
        "PurseRefundAuthorisedIndicator"  : AuthorisedIndicator_t(PurseRefundAuthorisedIndicator[0]),
        "CardSaleAddValueAmount"          : CardSaleAddValueAmount,
        "RefundServiceCharge"             : RefundServiceCharge[0],
        "ReplacementServiceCharge"        : ReplacementServiceCharge[0],
        "DepositAmount"                   : DepositAmount[0],
        "IssuanceServiceCharge"           : IssuanceServiceCharge[0],
        "LastUsageValidityPeriod"         : LastUsageValidityPeriod[0],
        "ValidityDuration"                : ValidityDuration[0],
        "EmployeeCardCheck"               : utils.Boolean_tNY(EmployeeCardCheck[0]),
        "SalePermitted"                   : utils.Boolean_tNY(SalePermitted[0]),
        "UsedForExitOnly"                 : utils.Boolean_tNY(UsedForExitOnly[0]),
        "ConcessionFlag"                  : utils.Boolean_tNY(ConcessionFlag[0]),
        "DisplayLight"                    : basetypes.DisplayLight_t(DisplayLight[0]),
        "DeviceTone"                      : basetypes.DeviceTone_t(DeviceTone[0])
    };
    CardSaleDescriptions[index] = objectResult;
  }
  var cspDetails = {
    "ParameterData" : {
      "NumberOfCSPDescriptions"  : NumberOfCSPDescriptions[0],
      CardSaleDescriptions
    }
  }
  return cspDetails;
}
// 5.5 Common Transit Pass Scheme Table
function CTPDetails_t(buffer) {
  var offset = 0;
  var NumberOfCTPDescriptions = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;
  var index;
  var CommonTransitPassDescriptions = [];
  for(index = 0; index < NumberOfCTPDescriptions; index++){
    var objectResult = {};
    var CommonTransitPassTypeID            = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var CommonTransitPassSPIssuerID        = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var CommonTransitPassDescription       = buffer.slice(offset, offset + 15);                       offset = offset + 15;   // 15 bytes
    var EnableIndicator                    = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var PassValidityDurationMode           = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var ValidityDuration                   = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var PassFixedStartDate                 = new Uint32Array(buffer.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes    
    var PassFixedEndDate                   = new Uint32Array(buffer.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
    var FirstUsageValidityPeriod           = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var PassDailyRideLimit                 = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var SalePrice                          = basetypes.ValueOneUnitUnsigned_t(buffer.slice(offset, offset + 3)); offset = offset + 3; // 3 bytes
    var MaximumAllowedTrips                = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var PassAverageTripPrice               = new Uint16Array(buffer.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
    var RefundAuthorisedIndicator          = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var RefundServiceCharge                = new Uint32Array(buffer.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
    var CardTypeAllowedList                = buffer.slice(offset, offset + 8);                        offset = offset + 8;    // 8 bytes
    var SalePermitted                      = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte 
    var PNRPassonly                        = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var EmployeePassType                   = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte   
    objectResult = {
        "CommonTransitPassTypeID"          :  CommonTransitPassTypeID[0],
        "CommonTransitPassSPIssuerID"      :  CommonTransitPassSPIssuerID[0],
        "CommonTransitPassDescription"     :  utils.hexToAscii(arrayBufferToHex(CommonTransitPassDescription)),
        "EnableIndicator"                  :  utils.Boolean_tNY(EnableIndicator[0]),
        "PassValidityDurationMode"         :  basetypes.PassValidityDurationMode_t(PassValidityDurationMode[0]),
        "ValidityDuration"                 :  ValidityDuration[0],
        "PassFixedStartDate"               :  utils.dateFormat(PassFixedStartDate[0]),
        "PassFixedEndDate"                 :  utils.dateFormat(PassFixedEndDate[0]),
        "FirstUsageValidityPeriod"         :  FirstUsageValidityPeriod[0],
        "PassDailyRideLimit"               :  PassDailyRideLimit[0],
        "SalePrice"                        :  SalePrice,
        "MaximumAllowedTrips"              :  MaximumAllowedTrips[0],
        "PassAverageTripPrice"             :  PassAverageTripPrice[0],
        "RefundAuthorisedIndicator"        :  utils.Boolean_tNY(RefundAuthorisedIndicator[0]),
        "RefundServiceCharge"              :  RefundServiceCharge[0],
        "CardTypeAllowedList"              :  arrayBufferToHex(CardTypeAllowedList),
        "SalePermitted"                    :  utils.Boolean_tNY(SalePermitted[0]),
        "PNRPassonly"                      :  utils.Boolean_tNY(PNRPassonly[0]),
        "EmployeePassType"                 :  utils.Boolean_tNY(EmployeePassType[0])
    };
    CommonTransitPassDescriptions[index] = objectResult;
  }
  var ctpDetails = {
    "ParameterData" : {
      "NumberOfCTPDescriptions"  : NumberOfCTPDescriptions[0],
      CommonTransitPassDescriptions
    }
  }
  return ctpDetails;
}
// 5.6 MRT Card Promotion Scheme Table
function BCPDetails_t(buffer) {
  //var offset = 0;
  const sizeOfCardPromotion   = 765;
  const sizeOfPromotionScheme = 255;
  var index;
  var MRTCardPromotionDescriptions = [];
  // loop all Card Type 0 - 64
  for(index = 0; index < 64; index++) {
    var objectResult = {};
    var startIndexTable = index * sizeOfCardPromotion;
    var arrayCardPromotionTable = buffer.slice(startIndexTable, startIndexTable + sizeOfCardPromotion);
    //console.log("BCPDetails_t : startIndexTable = " + startIndexTable);
    if (!utils.isZeroAllBufferArray(arrayCardPromotionTable)) {
        //console.log(arrayCardPromotionTable);
        //console.log("BCPDetails_t : index Table = " + index + " is not zero");
        // 1.Promotion Scheme Definition for Sale of Card                  225 bytes
        // 2.Promotion Scheme Definition for add Value of Card             225 bytes
        // 3.Promotion Scheme Definition for usage of Card                 225 bytes
        var schemeIndex;
        var schemeObjectDetails = [];
        for (schemeIndex = 0; schemeIndex < 3; schemeIndex++) {
            // ========================================= //
            var nameScheme;
            switch (schemeIndex) {
              case 0 : nameScheme = "forSaleOfCard";      break;
              case 1 : nameScheme = "forAddValueOfCard";  break;
              case 2 : nameScheme = "forUsageOfCard";     break;
            };
            // ========================================= //
            var resultSchemeDetails = {};
            var startIndexScheme = schemeIndex * sizeOfPromotionScheme;
            //console.log("BCPDetails_t : startIndexScheme = " + startIndexScheme);
            var arrayPromotionScheme = arrayCardPromotionTable.slice(startIndexScheme, startIndexScheme + sizeOfPromotionScheme);
            if(!utils.isZeroAllBufferArray(arrayPromotionScheme)) {
              var offset = 0;
              //console.log(arrayPromotionScheme);
              //console.log("BCPDetails_t : start offset = " + offset);
              //console.log("BCPDetails_t : index  = " + index + " scheme = " + schemeIndex + " is not zero");
              //console.log("BCPDetails_t : index  = " + index + " scheme = " + schemeIndex + " is zero");
              var PromotionSchemeID            = new Uint8Array (arrayCardPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
              var PromotionSchemeOwner         = new Uint16Array(arrayCardPromotionTable.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
              var EnableIndicator              = new Uint8Array (arrayCardPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
              var ApplicableOnWeekdays         = new Uint8Array (arrayCardPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
              var ApplicableOnWeekends         = new Uint8Array (arrayCardPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
              var ApplicableOnSpecialDays      = new Uint8Array (arrayCardPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
              var ApplicableOnPublicHolidays   = new Uint8Array (arrayCardPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
              var ApplicableOnSpecificDate1    = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate2    = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate3    = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate4    = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate5    = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate6    = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate7    = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate8    = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate9    = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate10   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate11   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate12   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate13   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate14   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate15   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate16   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate17   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate18   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate19   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ApplicableOnSpecificDate20   = new Uint32Array(arrayCardPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
              var ValidTimePeriods             = arrayCardPromotionTable.slice(offset, offset + 3);                        offset = offset + 3;    // 3 bytes
              var ValidAtStation               = arrayCardPromotionTable.slice(offset, offset + 128);                      offset = offset + 128;  // 128 bytes
              var PromotionMode                = new Uint8Array (arrayCardPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
              var PromotionValue               = new Uint16Array(arrayCardPromotionTable.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
              var AddValueThreshold            = basetypes.ValueOneUnitUnsigned_t(arrayCardPromotionTable.slice(offset, offset + 3)); offset = offset + 3; // 3 bytes

              //console.log("BCPDetails_t : end offset = " + offset);
              resultSchemeDetails = {
                ["PromotionScheme" + schemeIndex + nameScheme ] : {
                    "PromotionSchemeID"           :   PromotionSchemeID[0],
                    "PromotionSchemeOwner"        :   PromotionSchemeOwner[0],
                    "EnableIndicator"             :   utils.Boolean_tNY(EnableIndicator[0]),
                    "ApplicableOnWeekdays"        :   utils.Boolean_tNY(ApplicableOnWeekdays[0]),
                    "ApplicableOnWeekends"        :   utils.Boolean_tNY(ApplicableOnWeekends[0]),
                    "ApplicableOnSpecialDays"     :   utils.Boolean_tNY(ApplicableOnSpecialDays[0]),
                    "ApplicableOnPublicHolidays"  :   utils.Boolean_tNY(ApplicableOnPublicHolidays[0]),
                    "ApplicableOnSpecificDate1"   :   utils.dateFormat(ApplicableOnSpecificDate1[0]),
                    "ApplicableOnSpecificDate2"   :   utils.dateFormat(ApplicableOnSpecificDate2[0]),
                    "ApplicableOnSpecificDate3"   :   utils.dateFormat(ApplicableOnSpecificDate3[0]),
                    "ApplicableOnSpecificDate4"   :   utils.dateFormat(ApplicableOnSpecificDate4[0]),
                    "ApplicableOnSpecificDate5"   :   utils.dateFormat(ApplicableOnSpecificDate5[0]),
                    "ApplicableOnSpecificDate6"   :   utils.dateFormat(ApplicableOnSpecificDate6[0]),
                    "ApplicableOnSpecificDate7"   :   utils.dateFormat(ApplicableOnSpecificDate7[0]),
                    "ApplicableOnSpecificDate8"   :   utils.dateFormat(ApplicableOnSpecificDate8[0]),
                    "ApplicableOnSpecificDate9"   :   utils.dateFormat(ApplicableOnSpecificDate9[0]),
                    "ApplicableOnSpecificDate10"  :   utils.dateFormat(ApplicableOnSpecificDate10[0]),
                    "ApplicableOnSpecificDate11"  :   utils.dateFormat(ApplicableOnSpecificDate11[0]),
                    "ApplicableOnSpecificDate12"  :   utils.dateFormat(ApplicableOnSpecificDate12[0]),
                    "ApplicableOnSpecificDate13"  :   utils.dateFormat(ApplicableOnSpecificDate13[0]),
                    "ApplicableOnSpecificDate14"  :   utils.dateFormat(ApplicableOnSpecificDate14[0]),
                    "ApplicableOnSpecificDate15"  :   utils.dateFormat(ApplicableOnSpecificDate15[0]),
                    "ApplicableOnSpecificDate16"  :   utils.dateFormat(ApplicableOnSpecificDate16[0]),
                    "ApplicableOnSpecificDate17"  :   utils.dateFormat(ApplicableOnSpecificDate17[0]),
                    "ApplicableOnSpecificDate18"  :   utils.dateFormat(ApplicableOnSpecificDate18[0]),
                    "ApplicableOnSpecificDate19"  :   utils.dateFormat(ApplicableOnSpecificDate19[0]),
                    "ApplicableOnSpecificDate20"  :   utils.dateFormat(ApplicableOnSpecificDate20[0]),
                    "ValidTimePeriods"            :   utils.hexToAscii(arrayBufferToHex(ValidTimePeriods)),   //utils.TimePeriodsToBits(ValidTimePeriods),
                    "ValidAtStation"              :   utils.hexToAscii(arrayBufferToHex(ValidAtStation)),     //utils.ShowsBinarys(ValidAtStation),
                    "PromotionMode"               :   PromotionMode[0],
                    "PromotionValue"              :   PromotionValue[0],
                    "AddValueThreshold"           :   AddValueThreshold
                }
              };
            }else{
              //console.log("BCPDetails_t : index  = " + index + " scheme = " + schemeIndex + " is zero");
              resultSchemeDetails = {
                  ["PromotionScheme" + schemeIndex + nameScheme ] : "null"
              };
            }
            schemeObjectDetails[schemeIndex] = resultSchemeDetails
        }
        //console.log(schemeObjectDetails);
        // done
        var message_header_t = {
          ["MRTCardPromotion" + index + "Description"] : "details"
        }
        objectResult = Object.assign(message_header_t, schemeObjectDetails[0], schemeObjectDetails[1], schemeObjectDetails[2]);
    }else{
        //console.log("BCPDetails_t : index Table = " + index + " is zero");
        objectResult = {
          ["MRTCardPromotion" + index + "Description"] : "null"
        }
    }
    MRTCardPromotionDescriptions[index] = objectResult;
  }
  var bcpDetails = {
    "ParameterData" : {
      MRTCardPromotionDescriptions
    }
  }
  return bcpDetails;
}
// 5.7 MRT CTP Promotion Scheme Table
function BPPDetails_t(buffer) {
  const sizeOfCTPPromotion    = 222;
  var index;
  var MRTCTPPromotionDescriptions = [];
  // loop all Card Type 0 - 64
  for(index = 0; index < 64; index++) {
    var objectResult = {};
    var startIndexTable = index * sizeOfCTPPromotion;
    var arrayCTPPromotionTable = buffer.slice(startIndexTable, startIndexTable + sizeOfCTPPromotion);
    if(!utils.isZeroAllBufferArray(arrayCTPPromotionTable)) {
      var offset = 0;
      var PromotionSchemeID            = new Uint8Array (arrayCTPPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
      var PromotionSchemeOwner         = new Uint16Array(arrayCTPPromotionTable.slice(offset ,offset + 2));       offset = offset + 2;    // 2 bytes
      var EnableIndicator              = new Uint8Array (arrayCTPPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
      var ApplicableOnWeekdays         = new Uint8Array (arrayCTPPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
      var ApplicableOnWeekends         = new Uint8Array (arrayCTPPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
      var ApplicableOnSpecialDays      = new Uint8Array (arrayCTPPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
      var ApplicableOnPublicHolidays   = new Uint8Array (arrayCTPPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
      var ApplicableOnSpecificDate1    = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate2    = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate3    = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate4    = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate5    = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate6    = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate7    = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate8    = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate9    = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate10   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate11   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate12   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate13   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate14   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate15   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate16   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate17   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate18   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate19   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ApplicableOnSpecificDate20   = new Uint32Array(arrayCTPPromotionTable.slice(offset , offset + 4));      offset = offset + 4;    // 4 bytes
      var ValidTimePeriods             = arrayCTPPromotionTable.slice(offset, offset + 3);                        offset = offset + 3;    // 3 bytes
      var ValidAtStation               = arrayCTPPromotionTable.slice(offset, offset + 128);                      offset = offset + 128;  // 128 bytes
      var PromotionMode                = new Uint8Array (arrayCTPPromotionTable.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
      var PromotionValue               = new Uint16Array(arrayCTPPromotionTable.slice(offset , offset + 2));      offset = offset + 2;    // 2 bytes
      //console.log("PromotionSchemeID  = " + PromotionSchemeID[0]);
      objectResult = {
        ["PromotionScheme" + index + "Description"] : {
          "PromotionSchemeID"           :   PromotionSchemeID[0],
          "PromotionSchemeOwner"        :   PromotionSchemeOwner[0],
          "EnableIndicator"             :   utils.Boolean_tNY(EnableIndicator[0]),
          "ApplicableOnWeekdays"        :   utils.Boolean_tNY(ApplicableOnWeekdays[0]),
          "ApplicableOnWeekends"        :   utils.Boolean_tNY(ApplicableOnWeekends[0]),
          "ApplicableOnSpecialDays"     :   utils.Boolean_tNY(ApplicableOnSpecialDays[0]),
          "ApplicableOnPublicHolidays"  :   utils.Boolean_tNY(ApplicableOnPublicHolidays[0]),
          "ApplicableOnSpecificDate1"   :   utils.dateFormat(ApplicableOnSpecificDate1[0]),
          "ApplicableOnSpecificDate2"   :   utils.dateFormat(ApplicableOnSpecificDate2[0]),
          "ApplicableOnSpecificDate3"   :   utils.dateFormat(ApplicableOnSpecificDate3[0]),
          "ApplicableOnSpecificDate4"   :   utils.dateFormat(ApplicableOnSpecificDate4[0]),
          "ApplicableOnSpecificDate5"   :   utils.dateFormat(ApplicableOnSpecificDate5[0]),
          "ApplicableOnSpecificDate6"   :   utils.dateFormat(ApplicableOnSpecificDate6[0]),
          "ApplicableOnSpecificDate7"   :   utils.dateFormat(ApplicableOnSpecificDate7[0]),
          "ApplicableOnSpecificDate8"   :   utils.dateFormat(ApplicableOnSpecificDate8[0]),
          "ApplicableOnSpecificDate9"   :   utils.dateFormat(ApplicableOnSpecificDate9[0]),
          "ApplicableOnSpecificDate10"  :   utils.dateFormat(ApplicableOnSpecificDate10[0]),
          "ApplicableOnSpecificDate11"  :   utils.dateFormat(ApplicableOnSpecificDate11[0]),
          "ApplicableOnSpecificDate12"  :   utils.dateFormat(ApplicableOnSpecificDate12[0]),
          "ApplicableOnSpecificDate13"  :   utils.dateFormat(ApplicableOnSpecificDate13[0]),
          "ApplicableOnSpecificDate14"  :   utils.dateFormat(ApplicableOnSpecificDate14[0]),
          "ApplicableOnSpecificDate15"  :   utils.dateFormat(ApplicableOnSpecificDate15[0]),
          "ApplicableOnSpecificDate16"  :   utils.dateFormat(ApplicableOnSpecificDate16[0]),
          "ApplicableOnSpecificDate17"  :   utils.dateFormat(ApplicableOnSpecificDate17[0]),
          "ApplicableOnSpecificDate18"  :   utils.dateFormat(ApplicableOnSpecificDate18[0]),
          "ApplicableOnSpecificDate19"  :   utils.dateFormat(ApplicableOnSpecificDate19[0]),
          "ApplicableOnSpecificDate20"  :   utils.dateFormat(ApplicableOnSpecificDate20[0]),
          "ValidTimePeriods"            :   utils.hexToAscii(arrayBufferToHex(ValidTimePeriods)),   //utils.TimePeriodsToBits(ValidTimePeriods),
          "ValidAtStation"              :   utils.hexToAscii(arrayBufferToHex(ValidAtStation)),     //utils.ShowsBinarys(ValidAtStation),
          "PromotionMode"               :   PromotionMode[0],
          "PromotionValue"              :   PromotionValue[0]
        }
      };
    }else{
      objectResult = {
        ["MRTCTPPromotion" + index + "Description"] : "null"
      }
    }
    MRTCTPPromotionDescriptions[index] = objectResult;
  }
  var bppDetails = {
    "ParameterData" : {
      MRTCTPPromotionDescriptions
    }
  }
  return bppDetails;
}
// 5.8 Holder Profile Table
function HPTDetails_t(buffer) {
  var offset = 0;
  var NumberOfHPTDescriptions = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;   // 1 byte
  var index;
  var HolderProfileDescriptions = [];
  for(index = 0; index < NumberOfHPTDescriptions; index++){
    var objectResult = {};
    var CardType                           = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var HolderProfileType                  = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var HolderProfileDescription           = buffer.slice(offset, offset + 32);                       offset = offset + 32;   // 32 bytes
    var StartValidAge                      = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte 
    var EndValidAge                        = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte
    var ProfileValidationRequired          = new Uint8Array (buffer.slice(offset, offset + 1));       offset = offset + 1;    // 1 byte   
    objectResult = {
        "CardType"                      :  CardType[0],
        "HolderProfileType"             :  HolderProfileType[0],
        "HolderProfileDescription"      :  utils.hexToAscii(arrayBufferToHex(HolderProfileDescription)),
        "StartValidAge"                 :  StartValidAge[0],
        "EndValidAge"                   :  EndValidAge[0],
        "ProfileValidationRequired"     :  ProfileValidationRequired[0],
    };
    HolderProfileDescriptions[index] = objectResult;
  }
  var hptDetails = {
    "ParameterData" : {
      "NumberOfHPTDescriptions"  : NumberOfHPTDescriptions[0],
      HolderProfileDescriptions
    }
  }
  return hptDetails;
}
// 5.9 Full Card Blacklist Table
function FBLDetails_t(buffer) {
    // Blacklist entries list
    var indexNumberOfCSCEntries = 0;
    var NumberOfCSCEntries = new Uint16Array (buffer.slice(indexNumberOfCSCEntries, indexNumberOfCSCEntries + 2)); indexNumberOfCSCEntries = indexNumberOfCSCEntries + 2;
    var CSCEntriesList = [];
    var countIndexCSCEntries;
    var startIndexCSCEntries        =   indexNumberOfCSCEntries;
    for(countIndexCSCEntries = 0; countIndexCSCEntries < NumberOfCSCEntries[0]; countIndexCSCEntries++) {
        var resultCSCEntries = {};
        var CardID                      =   utils.getCardId(buffer.slice(startIndexCSCEntries, startIndexCSCEntries + 5));  startIndexCSCEntries = startIndexCSCEntries + 5;    // 5 bytes
        var CardUnblockSequenceNumber   =   new Uint8Array (buffer.slice(startIndexCSCEntries, startIndexCSCEntries + 1));  startIndexCSCEntries = startIndexCSCEntries + 1;    // 1 byte
        var BlacklistAction             =   new Uint8Array (buffer.slice(startIndexCSCEntries, startIndexCSCEntries + 1));  startIndexCSCEntries = startIndexCSCEntries + 1;    // 1 byte
        var BlacklistReason             =   new Uint8Array (buffer.slice(startIndexCSCEntries, startIndexCSCEntries + 1));  startIndexCSCEntries = startIndexCSCEntries + 1;    // 1 byte
        resultCSCEntries = {
              ["CSCEntry" + (countIndexCSCEntries+1) ] : {
                "CardID"                    :   CardID,
                "CardUnblockSequenceNumber" :   CardUnblockSequenceNumber[0],
                "BlacklistAction"           :   basetypes.BlacklistActionCode_t(BlacklistAction[0]),
                "BlacklistReason"           :   basetypes.BlacklistReasonCode_t(BlacklistReason[0]),
              }
        };
        CSCEntriesList[countIndexCSCEntries] = resultCSCEntries;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Blacklist Range entries list
    var indexNumberOfCSCRangeEntries = 50001;
    var NumberOfCSCRangeEntries = new Uint16Array (buffer.slice(indexNumberOfCSCRangeEntries, indexNumberOfCSCRangeEntries + 2)); indexNumberOfCSCRangeEntries = indexNumberOfCSCRangeEntries + 2;
    var CSCRangeEntriesList = [];
    var countIndexCSCRangeEntries;
    var startIndexCSCRangeEntries   =   indexNumberOfCSCRangeEntries;
    for(countIndexCSCRangeEntries = 0; countIndexCSCRangeEntries < NumberOfCSCRangeEntries[0]; countIndexCSCRangeEntries++) {
        var resultCSCRangeEntries = {};
        var CardIDStart                 =   utils.getCardId(buffer.slice(startIndexCSCRangeEntries, startIndexCSCRangeEntries + 5));  startIndexCSCRangeEntries = startIndexCSCRangeEntries + 5;    // 5 bytes
        var CardIDEnd                   =   utils.getCardId(buffer.slice(startIndexCSCRangeEntries, startIndexCSCRangeEntries + 5));  startIndexCSCRangeEntries = startIndexCSCRangeEntries + 5;    // 5 bytes
        var BlacklistAction             =   new Uint8Array (buffer.slice(startIndexCSCRangeEntries, startIndexCSCRangeEntries + 1));  startIndexCSCRangeEntries = startIndexCSCRangeEntries + 1;    // 1 byte
        var BlacklistReason             =   new Uint8Array (buffer.slice(startIndexCSCRangeEntries, startIndexCSCRangeEntries + 1));  startIndexCSCRangeEntries = startIndexCSCRangeEntries + 1;    // 1 byte
        resultCSCRangeEntries = {
              ["CSCRangeEntry" + (countIndexCSCRangeEntries+1) ] : {
                "CardIDStart"       :   CardIDStart,
                "CardIDEnd"         :   CardIDEnd,
                "BlacklistAction"   :   basetypes.BlacklistActionCode_t(BlacklistAction[0]),
                "BlacklistReason"   :   basetypes.BlacklistReasonCode_t(BlacklistReason[0]),
              }
        };
        CSCRangeEntriesList[countIndexCSCRangeEntries] = resultCSCRangeEntries;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var fblDetails = {
      "ParameterData" : {
        "NumberOfCSCEntries"        : NumberOfCSCEntries[0],
        CSCEntriesList,
        "NumberOfCSCRangeEntries"   : NumberOfCSCRangeEntries[0],
        CSCRangeEntriesList,
      }
    }
    return fblDetails;
}
// 5.10 Partial Card Blacklist Table
function PBLDetails_t(buffer) {
  // Blacklist entries list
  var indexNumberOfCSCEntries = 0;
  var NumberOfCSCEntries = new Uint16Array (buffer.slice(indexNumberOfCSCEntries, indexNumberOfCSCEntries + 2)); indexNumberOfCSCEntries = indexNumberOfCSCEntries + 2;
  var CSCEntriesList = [];
  var countIndexCSCEntries;
  var startIndexCSCEntries        =   indexNumberOfCSCEntries;
  for(countIndexCSCEntries = 0; countIndexCSCEntries < NumberOfCSCEntries[0]; countIndexCSCEntries++) {
      var resultCSCEntries = {};
      var ActionIndicator             =   new Uint8Array (buffer.slice(startIndexCSCEntries, startIndexCSCEntries + 1));  startIndexCSCEntries = startIndexCSCEntries + 1;    // 1 byte
      var CardID                      =   utils.getCardId(buffer.slice(startIndexCSCEntries, startIndexCSCEntries + 5));  startIndexCSCEntries = startIndexCSCEntries + 5;    // 5 bytes
      var CardUnblockSequenceNumber   =   new Uint8Array (buffer.slice(startIndexCSCEntries, startIndexCSCEntries + 1));  startIndexCSCEntries = startIndexCSCEntries + 1;    // 1 byte
      var BlacklistAction             =   new Uint8Array (buffer.slice(startIndexCSCEntries, startIndexCSCEntries + 1));  startIndexCSCEntries = startIndexCSCEntries + 1;    // 1 byte
      var BlacklistReason             =   new Uint8Array (buffer.slice(startIndexCSCEntries, startIndexCSCEntries + 1));  startIndexCSCEntries = startIndexCSCEntries + 1;    // 1 byte
      resultCSCEntries = {
            ["CSCEntry" + (countIndexCSCEntries+1) ] : {
              "ActionIndicator"           :   ActionIndicator[0],
              "CardID"                    :   CardID,
              "CardUnblockSequenceNumber" :   CardUnblockSequenceNumber[0],
              "BlacklistAction"           :   basetypes.BlacklistActionCode_t(BlacklistAction[0]),
              "BlacklistReason"           :   basetypes.BlacklistReasonCode_t(BlacklistReason[0]),
            }
      };
      CSCEntriesList[countIndexCSCEntries] = resultCSCEntries;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Blacklist Range entries list
  var indexNumberOfCSCRangeEntries = 1001;
  var NumberOfCSCRangeEntries = new Uint16Array (buffer.slice(indexNumberOfCSCRangeEntries, indexNumberOfCSCRangeEntries + 2)); indexNumberOfCSCRangeEntries = indexNumberOfCSCRangeEntries + 2;
  var CSCRangeEntriesList = [];
  var countIndexCSCRangeEntries;
  var startIndexCSCRangeEntries   =   indexNumberOfCSCRangeEntries;
  for(countIndexCSCRangeEntries = 0; countIndexCSCRangeEntries < NumberOfCSCRangeEntries[0]; countIndexCSCRangeEntries++) {
      var resultCSCRangeEntries       = {};
      var ActionIndicator             =   new Uint8Array (buffer.slice(startIndexCSCRangeEntries, startIndexCSCRangeEntries + 1));  startIndexCSCRangeEntries = startIndexCSCRangeEntries + 1;    // 1 byte
      var CardIDStart                 =   utils.getCardId(buffer.slice(startIndexCSCRangeEntries, startIndexCSCRangeEntries + 5));  startIndexCSCRangeEntries = startIndexCSCRangeEntries + 5;    // 5 bytes
      var CardIDEnd                   =   utils.getCardId(buffer.slice(startIndexCSCRangeEntries, startIndexCSCRangeEntries + 5));  startIndexCSCRangeEntries = startIndexCSCRangeEntries + 5;    // 5 bytes
      var BlacklistAction             =   new Uint8Array (buffer.slice(startIndexCSCRangeEntries, startIndexCSCRangeEntries + 1));  startIndexCSCRangeEntries = startIndexCSCRangeEntries + 1;    // 1 byte
      var BlacklistReason             =   new Uint8Array (buffer.slice(startIndexCSCRangeEntries, startIndexCSCRangeEntries + 1));  startIndexCSCRangeEntries = startIndexCSCRangeEntries + 1;    // 1 byte
      resultCSCRangeEntries = {
            ["CSCRangeEntry" + (countIndexCSCRangeEntries+1) ] : {
              "ActionIndicator"   :   ActionIndicator[0],
              "CardIDStart"       :   CardIDStart,
              "CardIDEnd"         :   CardIDEnd,
              "BlacklistAction"   :   basetypes.BlacklistActionCode_t(BlacklistAction[0]),
              "BlacklistReason"   :   basetypes.BlacklistReasonCode_t(BlacklistReason[0]),
            }
      };
      CSCRangeEntriesList[countIndexCSCRangeEntries] = resultCSCRangeEntries;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var pblDetails = {
    "ParameterData" : {
      "NumberOfCSCEntries"        : NumberOfCSCEntries[0],
      CSCEntriesList,
      "NumberOfCSCRangeEntries"   : NumberOfCSCRangeEntries[0],
      CSCRangeEntriesList,
    }
  }
  return pblDetails;
}
// 5.11 MRT Equipment ID Blacklists Table
function CBLDetails_t(buffer){
    var offset = 0;
    var NumberOfEquipmentIDEntries = new Uint16Array (buffer.slice(offset, offset + 2));   offset = offset + 2;   // 1 byte
    var index;
    var  EquipmentIDEntryList = [];
    for(index = 0; index < NumberOfEquipmentIDEntries[0] ; index++){
      var objectResult = {};
      var ServiceProviderID             = new Uint8Array  (buffer.slice(offset, offset + 1));  offset = offset + 1;    // 1 byte
      var EquipmentID                   = new Uint32Array (buffer.slice(offset, offset + 1));  offset = offset + 1;    // 1 byte
      var EquipmentLostOrStolenDate     = new Uint32Array (buffer.slice(offset, offset + 4));  offset = offset + 4;    // 4 bytes
      var BlacklistAction               = new Uint8Array  (buffer.slice(offset, offset + 1));  offset = offset + 1;    // 1 byte  
      objectResult = {
          ["EquipmentIDEntry"+(index+1)] : {
            "ServiceProviderID"            :  ServiceProviderID[0],
            "EquipmentID"                  :  EquipmentID[0],
            "EquipmentLostOrStolenDate"    :  utils.dateFormat(EquipmentLostOrStolenDate[0]),
            "BlacklistAction"              :  basetypes.BlacklistActionCode_t(BlacklistAction[0])
          }
      };
      EquipmentIDEntryList[index] = objectResult;
    }
    var cblDetails = {
      "ParameterData" : {
        "NumberOfEquipmentIDEntries"  : NumberOfEquipmentIDEntries[0],
        EquipmentIDEntryList
      }
    }
    return cblDetails;
}
// 5.12 Location Table
function LOCDetails_t(buffer) {
    var offset = 0;
    var NumberOfLocations = new Uint16Array (buffer.slice(offset, offset + 2));   offset = offset + 2;   // 1 byte
    var index;
    var LocationIDList = [];
    for(index = 0; index < NumberOfLocations[0] ; index++){
      var objectResult = {};
      var LocationID         = new Uint16Array  (buffer.slice(offset, offset + 2));  offset = offset + 2;    // 2 byte
      var EnglishName        = buffer.slice(offset, offset + 50);  offset = offset + 50;    // 50 bytes
      var ThaiName           = buffer.slice(offset, offset + 50);  offset = offset + 50;    // 50 bytes
      var ServerIPAddress    = buffer.slice(offset, offset + 15);  offset = offset + 15;    // 50 bytes
      objectResult = {
          ["LocationID"+(index+1)] : {
            "LocationID"        :  LocationID[0],
            "EnglishName"       :  utils.hexToAscii(arrayBufferToHex(EnglishName)),
            "ThaiName"          :  utils.hexToAscii(arrayBufferToHex(ThaiName)),
            "ServerIPAddress"   :  utils.hexToAscii(arrayBufferToHex(ServerIPAddress))
          }
      };
      LocationIDList[index] = objectResult;
    }
    var locDetails = {
      "ParameterData" : {
        "NumberOfLocations"  : NumberOfLocations[0],
        LocationIDList
      }
    }
    return locDetails;
}
// 5.13 Operator Access Tables 
function OPADetails_t(buffer) {
    var offset = 0;
    var NumberOfOperators = new Uint32Array (buffer.slice(offset, offset + 4));   offset = offset + 4;   // 4 bytes
    var index;
    var OperatorList = [];
    for(index = 0; index < NumberOfOperators[0] ; index++){
      var objectResult = {};
      var LocationID         = new Uint32Array (buffer.slice(offset, offset + 4));    offset = offset + 4;    // 4 bytes
      var PasswordHash       = buffer.slice(offset, offset + 8);                      offset = offset + 8;    // 8 bytes
      var Name               = buffer.slice(offset, offset + 32);                     offset = offset + 32;   // 32 bytes
      var EffectiveDate      = new Uint32Array (buffer.slice(offset, offset + 4));    offset = offset + 4;    // 4 bytes
      var ExpiryDate         = new Uint32Array (buffer.slice(offset, offset + 4));    offset = offset + 4;    // 4 bytes  
      var RoleID             = new Uint8Array  (buffer.slice(offset, offset + 1));    offset = offset + 1;    // 4 bytes
      objectResult = {
          ["Operator"+(index+1)] : {
            "LocationID"        :  LocationID[0],
            "PasswordHash"      :  utils.hexToAscii(arrayBufferToHex(PasswordHash)),
            "Name"              :  utils.hexToAscii(arrayBufferToHex(Name)),
            "EffectiveDate"     :  utils.dateFormat(EffectiveDate[0]),
            "ExpiryDate"        :  utils.dateFormat(ExpiryDate[0]),
            "RoleID"            :  RoleID_t(RoleID[0])
          }
      };
      OperatorList[index] = objectResult;
    }
    var opaDetails = {
      "ParameterData" : {
        "NumberOfOperators"  : NumberOfOperators[0],
        OperatorList
      }
    }
    return opaDetails;
}
// 5.14 
function dataDetails_t(pdId, bufferArray){
  var outPdJson;
  //console.log("dataDetails_t : File Id = " + pdId );
  var intPdId = Number(pdId);
  switch (intPdId) {
    case 101:
      outPdJson = PDFDetails_t(bufferArray); 
      break;
    case 102:
      outPdJson = PDFDetails_t(bufferArray); 
      break;
    case 104:
      outPdJson = AVQDetails_t(bufferArray); 
      break;
    case 105:
      outPdJson = CSPDetails_t(bufferArray); 
      break;
    case 106:
      outPdJson = CTPDetails_t(bufferArray); 
      break;
   // case 108:
   //   outPdJson = SDPDetails_t(bufferArray); 
  //   break;
    case 110:
      outPdJson = BCPDetails_t(bufferArray); 
      break;
    case 111:
      outPdJson = BPPDetails_t(bufferArray); 
      break;
    case 114:
      outPdJson = HPTDetails_t(bufferArray); 
      break;
    case 115:
      outPdJson = SQLDetails_t(bufferArray); 
      break;
    case 116:
      outPdJson = SQLDetails_t(bufferArray); 
      break;
    case 117:
      outPdJson = LOCDetails_t(bufferArray); 
      break;
    case 119:
      outPdJson = OPADetails_t(bufferArray); 
      break;
    case 120:
      outPdJson = FBLDetails_t(bufferArray); 
      break;
    case 121:
      outPdJson = PBLDetails_t(bufferArray); 
      break;
    case 122:
      outPdJson = CBLDetails_t(bufferArray);
      break;
    default:
      outPdJson = {
        "ParameterData" : {
          "ID"         : intPdId,
          "unsupports" : "yes"
        }
      }
      break;
  }
  return outPdJson;//
}

function dumpPd(buffer) {
  var filePdTypeId  = new Uint8Array(buffer.slice(0, 1));  
  var filePdLength  = new Uint32Array(buffer.slice(11, 15)); 
  //console.log("dumpPd : File Id = " + filePdTypeId + " File Length = " +filePdLength);

  var arrFileHeader = buffer.slice(0, 16);
  var fileHeader = PD_FileHeader_t(arrFileHeader);

  var arrDataDetails  = buffer.slice(16, filePdLength - 4);
  var pdDataDetails   = dataDetails_t(filePdTypeId, arrDataDetails);

  var arrFileTrailer = buffer.slice( filePdLength - 4,filePdLength);
  var fileTrailer = PD_FileTrailer_t(arrFileTrailer);
  var pdTemp = Object.assign(fileHeader, pdDataDetails, fileTrailer);
  return pdTemp;
}

export {
  isValidPdType,
  getPdTypeId,
  dumpPd,
}; // a list of exported variables