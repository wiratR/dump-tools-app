import arrayBufferToHex from 'array-buffer-to-hex';
import * as utils from './utils.js';
import * as basetypes from './baseTypes.js';

const header_length                   = 19;
const cardInfo_length                 = 19;
const purseInfo_length                = 8;
const lastAddValueInfo_length         = 20;
const tranValueInfo_length            = 4;
const paymentInfo_length              = 34;
const svcIssueInfo_length             = 15;
const transitSpecInfo_length          = 15;
const passInfo_length                 = 24;
const ctpIssueInfo_length             = 28;
const stpIssueInfo_length             = 27;
const entryGateInfo_length            = 4;
const carParkingInfo_length           = 42;
const personalInfo_length             = 291;
const employeeInfo_length             = 7;
const blacklistInfo_length            = 1;
const rejectionInfo_length            = 1;
const personalisationInfo_length      = 2;
const cardholderPhotoInfo_length      = 60002;
const cardHolderFeeInfo_length        = 15;
const promotionPurseInfo_length       = 17;
const exitGateInfo_length             = 28;
const initialInfo_length              = 21;
const svcUpgradeInfo_length           = 14;
const passUpgradeInfo_length          = 18;
const originInfo_length               = 4;
const PNREP6BarrierOpenInfo_length    = 5;
const transitPromotionInfo_length     = 41;
const taxAnddiscountInfo_length       = 14;
const inVoidandReceiptInfo_length     = 3;
const svcRefundInfo_length            = 60;
const passRefundInfo_length           = 57;
const svcReplacemneInfo_length        = 25;
const ctpReplacementInfo_length       = 27;
const giftBonusTripRedempInfo_length  = 16;
const luckyDrawRedemptionInfo_length  = 1;
const postOperationalInfo_length      = 9;
const postShiftInfo_length            = 168;
const macInfo_length                  = 5;

// sections 4.6.1 Message Header 19 bytes
function messageHeader_t(data) {
    var offset = 0;
    var PayloadVersionNumber    = new Uint8Array(data.slice(offset, offset + 1));   offset = offset + 1;// 1 bytes
    var MessageSequenceNumber   = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;// 4 bytes
    var EquipmentID             = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;// 4 bytes
    var Lengthofmessage         = new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;// 2 bytes
    var TransactionID           = new Uint8Array(data.slice(offset, offset + 1));   offset = offset + 1;// 1 bytes
    var TransactionDateandTime  = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;// 4 bytes
    var ServiceProviderID       = new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;// 2 bytes
    var TransactionStatus       = new Uint8Array(data.slice(offset, offset + 1));   offset = offset + 1;// 1 bytes
    var messageHeader_t = {
        "MessageHeader" : {
            "PayloadVersionNumber"   : PayloadVersionNumber[0], 
            "MessageSequenceNumber"  : MessageSequenceNumber[0],
            "EquipmentID"            : EquipmentID[0],
            "Lengthofmessage"        : Lengthofmessage[0],
            "TransactionID"          : TransactionID[0],
            "TransactionDateandTime" : utils.dateFormat(TransactionDateandTime[0]),
            "ServiceProviderID"      : ServiceProviderID[0],
            "TransactionStatus"      : TransactionStatus[0]
        }
    };
    return messageHeader_t;
}
// sections 5.2.3 MAC Information 5 bytes
function macInfo_t(data) {
    var offset = 0;
    var MACVersion     = new Uint8Array(data.slice(offset, offset + 1));  offset = offset + 1;   // 1 bytes
    var MACValue       = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var macInformation_t = { 
        "MACInformation" : {
            "MACVersion"    : MACVersion[0],   
            "MACValue"      : MACValue[0]       
        }
    };
    return macInformation_t;
}
// sections 7.1 Card Information 19 bytes
function cardInfo_t(data) {
    var offset = 0;
    var ProjectId                   = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;  // 1 bytes
    var IssuerId                    = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;  // 1 bytes
    var CardId                      = utils.getCardId(data.slice(offset, offset + 5));    offset = offset + 5;  // 5 bytes
    var MediaType                   = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;  // 1 bytes
    var CardType                    = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;  // 1 bytes
    var LifeCycleCounter            = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;  // 1 bytes
    var CardStatus                  = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;  // 1 bytes
    var BlockFlag                   = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;  // 1 bytes
    var TestFlag                    = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;  // 1 bytes
    var CardSequenceNumber          = new Uint32Array(data.slice(offset, offset + 4));    offset = offset + 4;  // 4 bytes
    var CardUnblockSequenceNumber   = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;  // 1 bytes
    var PersonalisationFlag         = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;  // 1 bytes
    var cardInformation_t = {
        "CardInformation" : {
            "ProjectId"                 : ProjectId[0],
            "IssuerId"                  : IssuerId[0],
            "CardId"                    : CardId,
            "MediaType"                 : MediaType[0],
            "CardType"                  : CardType[0],
            "LifeCycleCounter"          : LifeCycleCounter[0],
            "CardStatus"                : CardStatus[0],
            "BlockFlag"                 : BlockFlag[0],
            "TestFlag"                  : TestFlag[0],
            "CardSequenceNumber"        : CardSequenceNumber[0],
            "CardUnblockSequenceNumber" : CardUnblockSequenceNumber[0],
            "PersonalisationFlag"       : PersonalisationFlag[0]
        }
    }
    return cardInformation_t;
}
// section 7.2 Purse Information 8 bytes
function purseInfo_t(data) {
    var offset = 0;
    var PurseValue   = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var PTSN         = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var purseInfomation_t = {
        "PurseInformation" : {
            "PurseValue"    : PurseValue[0],
            "PTSN"          : PTSN[0]
        }
    }
    return purseInfomation_t;
}
// 7.3 Last Add Value Information 20 bytes
function lastAddValueInfo_t(data) {
    var offset = 0;
    var LastAddValueServiceProviderID = new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2; // 2 bytes
    var LastAddValueLocationCode      = new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2; // 2 bytes
    var LastAddValueDateandTime       = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4; // 4 bytes
    var LastAddValueAmount            = basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3; // 3 bytes
    var LastAddValuePaymentMeansType  = new Uint8Array(data.slice(offset, offset + 1));   offset = offset + 1; // 1 bytes
    var LastAddValueEquipmentID       = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4; // 4 bytes
    var LastAddValuePTSN              = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4; // 4 bytes
    var lastAddValueInformation_t = {
        "LastAddValueInformation" : {
          "LastAddValueServiceProviderID"  : LastAddValueServiceProviderID[0], 
          "LastAddValueLocationCode"       : LastAddValueLocationCode[0],
          "LastAddValueDateandTime"        : LastAddValueDateandTime[0],
          "LastAddValueAmount"             : LastAddValueAmount,
          "LastAddValuePaymentMeansType"   : LastAddValuePaymentMeansType[0],
          "LastAddValueEquipmentID"        : LastAddValueEquipmentID[0],
          "LastAddValuePTSN"               : LastAddValuePTSN[0]
        } 
    }
    return lastAddValueInformation_t;
}
// section 7.4 Initialisation Information 21 bytes
function initialInfo_t(data) {
    var offset = 0;
    var ManufacturingID               = data.slice(offset, offset + 7);                     offset = offset + 7; // 7 bytes
    var DateofFirstInitialisation     = new Uint32Array(data.slice(offset, offset + 4));    offset = offset + 4; // 4 bytes
    var CardInitialisationDate        = new Uint32Array(data.slice(offset, offset + 4));    offset = offset + 4; // 4 bytes
    var CardFormatVersion             = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1; // 1 bytes
    var BatchNumber                   = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1; // 1 bytes
    var ShiftSequenceNumber           = new Uint32Array(data.slice(offset, offset + 4));    offset = offset + 4; // 4 bytes
    var initialisationInformation_t = {
        "InitialisationInformation" : {
              "ManufacturingID"           : arrayBufferToHex(ManufacturingID),
              "DateofFirstInitialisation" : utils.dateFormat(DateofFirstInitialisation[0]),
              "CardInitialisationDate"    : utils.dateFormat(CardInitialisationDate[0]),
              "CardFormatVersion"         : CardFormatVersion[0],
              "BatchNumber"               : BatchNumber[0],
              "ShiftSequenceNumber"       : ShiftSequenceNumber[0]
        }
    }
    return initialisationInformation_t;
}
// section 7.5 Personal Information 291 bytes
function personalInfo_t(data) {
    var offset = 0;
    var DateofBirth         =  data.slice(offset, offset + 3);                   offset = offset + 3;    // 3 bytes
    var Name                =  data.slice(offset, offset + 100);                 offset = offset + 100;  // 100 bytes
    var CityCode            =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;    // 2 bytes
    var Gender              =  new Uint8Array(data.slice(offset, offset + 1));   offset = offset + 1;    // 1 bytes
    var LanguageUsage       =  new Uint8Array(data.slice(offset, offset + 1));   offset = offset + 1;    // 1 bytes
    var personalID          =  data.slice(offset, offset + 13);                  offset = offset + 13;   // 13 bytes
    var Title               =  new Uint8Array(data.slice(offset, offset + 1));   offset = offset + 1;    // 1 bytes
    var EmailAddress        =  data.slice(offset, offset + 40);                  offset = offset + 40;   // 40 bytes       
    var HomeAddress         =  data.slice(offset, offset + 100);                 offset = offset + 100;  // 100 bytes
    var HomePhone           =  data.slice(offset, offset + 10);                  offset = offset + 10;   // 10 bytes
    var WorkPhone           =  data.slice(offset, offset + 10);                  offset = offset + 10;   // 10 bytes
    var MobilePhone         =  data.slice(offset, offset + 10);                  offset = offset + 10;   // 10 bytes
    var personalInformation_t =  {
      "PersonalInformation" : {
          "DateofBirth"     : utils.hexToAscii(arrayBufferToHex(DateofBirth)),   
          "Name"            : utils.hexToAscii(arrayBufferToHex(Name)),
          "CityCode"        : CityCode[0],
          "Gender"          : basetypes.Gender_t(Gender[0]),
          "LanguageUsage"   : basetypes.Language_t(LanguageUsage[0]),
          "PersonalID"      : utils.hexToAscii(arrayBufferToHex(personalID)),
          "Title"           : basetypes.Title_t(Title)[0],
          "EmailAddress"    : utils.hexToAscii(arrayBufferToHex(EmailAddress)),
          "HomeAddress"     : utils.hexToAscii(arrayBufferToHex(HomeAddress)),
          "HomePhone"       : utils.hexToAscii(arrayBufferToHex(HomePhone)),
          "WorkPhone"       : utils.hexToAscii(arrayBufferToHex(WorkPhone)),
          "MobilePhone"     : utils.hexToAscii(arrayBufferToHex(MobilePhone)),
      }
    }
    return personalInformation_t;
}
// section 7.6 Pass Information 24 bytes
function passInfo_t(data) {
    var offset = 0;
    var PassIdentificationNumber          = new Uint32Array(data.slice(offset, offset + 4));     offset = offset + 4; // 4 bytes
    var SPIDofPassIssuer                  = new Uint16Array(data.slice(offset, offset + 2));     offset = offset + 2; // 2 bytes
    var PassStatus                        = new Uint8Array(data.slice(offset, offset + 1));      offset = offset + 1; // 1 bytes
    var PassTypeID                        = new Uint8Array(data.slice(offset, offset + 1));      offset = offset + 1; // 1 bytes
    var PassValidStartDate                = new Uint32Array(data.slice(offset, offset + 4));     offset = offset + 4; // 4 bytes
    var PassValidEndDate                  = new Uint32Array(data.slice(offset, offset + 4));     offset = offset + 4; // 4 bytes
    var PassDailyTripCounter              = new Uint8Array(data.slice(offset, offset + 1));      offset = offset + 1; // 1 bytes
    var PassRemainingTripCounter          = new Uint16Array(data.slice(offset, offset + 2));     offset = offset + 2; // 2 bytes
    var ProductUnblockingSequenceNumber   = new Uint8Array(data.slice(offset, offset + 1));      offset = offset + 1; // 1 bytes
    var PTSN                              = new Uint32Array(data.slice(offset, offset + 4));     offset = offset + 4; // 4 bytes
    var passInformation_t = {
      "PassInformation" : {
          "PassIdentificationNumber"        : PassIdentificationNumber[0],
          "SPIDofPassIssuer"                : SPIDofPassIssuer[0],
          "PassStatus"                      : PassStatus[0],
          "PassTypeID"                      : PassTypeID[0],
          "PassValidStartDate"              : PassValidStartDate[0],
          "PassValidEndDate"                : PassValidEndDate[0],
          "PassDailyTripCounter"            : PassDailyTripCounter[0],
          "PassRemainingTripCounter"        : PassRemainingTripCounter[0],
          "ProductUnblockingSequenceNumber" : ProductUnblockingSequenceNumber[0],
          "PTSN"                            : PTSN[0]
      }
    }
    return passInformation_t;
}
// 7.7 Transit Specific Information 15 bytes
function transitSpecInfo_t(data){
    var offset = 0;
    var OperatingDay        = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4; // 4 bytes
    var EquipmentNumber     = data.slice(offset, offset + 9);                   offset = offset + 9; // 9 bytes
    var DestinationStation  = new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2; // 2 bytes
    var transitSpecInfomation_t = {
        "TransitSpecificInformation" : {
            "OperatingDay"        : utils.dateFormat(OperatingDay[0]),
            "EquipmentNumber"     : utils.hexToAscii(arrayBufferToHex(EquipmentNumber)),
            "DestinationStation"  : DestinationStation[0]
        }
    }
    return transitSpecInfomation_t;
}
// 7.8 Employee Information 
function employeeInfo_t() {
    var offset = 0;
    var EmployeeSubtype  = new Uint8Array(data.slice(offset, offset + 1));   offset = offset + 1; // 1 bytes
    var SPIDofEmployee   = new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2; // 2 bytes
    var EmployeeID       = new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4; // 4 bytes
    var employeeInfomation_t = {
        "EmployeeInformation" : {
            "EmployeeSubtype"   : EmployeeSubtype[0],
            "SPIDofEmployee"    : SPIDofEmployee[0],
            "EmployeeID"        : EmployeeID[0]
        }
    }
    return employeeInfomation_t;
}
// 7.9 Payment Information      // 34 bytes
function paymentInfo_t(data){
    var offset = 0;
    var PaymentMeansType            = new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1; // 1 bytes
    var PaymentMeans1AmountReceived = basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3; // 3 bytes
    var PaymentMeans1IdNumber       = data.slice(offset, offset + 8);                                    offset = offset + 8; // 8 bytes
    var PaymentMeans2AmountReceived = basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3; // 3 bytes
    var PaymentMeans2IdNumber       = data.slice(offset, offset + 8);                                    offset = offset + 8; // 8 bytes
    var PaymentMeans3AmountReceived = basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3; // 3 bytes
    var PaymentMeans3IdNumber       = data.slice(offset, offset + 8);                                    offset = offset + 8; // 8 bytes
    var paymentInformation_t = {
      "PaymentInformation" : {
          "PaymentMeansType"                  : PaymentMeansType[0],
          "PaymentMeans1AmountReceived"       : PaymentMeans1AmountReceived,
          "PaymentMeans1IdentificationNumber" : utils.hexToAscii(arrayBufferToHex(PaymentMeans1IdNumber)),
          "PaymentMeans2AmountReceived"       : PaymentMeans2AmountReceived,
          "PaymentMeans2IdentificationNumber" : utils.hexToAscii(arrayBufferToHex(PaymentMeans2IdNumber)),
          "PaymentMeans3AmountReceived"       : PaymentMeans3AmountReceived,
          "PaymentMeans3IdentificationNumber" : utils.hexToAscii(arrayBufferToHex(PaymentMeans3IdNumber))
      }
  }
  return paymentInformation_t;
}
// 7.10 SVC Issue Information   15 bytes
function scvIssueInfo_t(data) {
    var offset = 0;
    var CardIssuanceFee     =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3; // 3 bytes
    var CardDeposit         =  new Uint16Array(data.slice(offset, offset + 2));     offset = offset + 2; // 2 bytes
    var CardExpiryDate      =  new Uint32Array(data.slice(offset, offset + 4));     offset = offset + 4; // 4 bytes
    var CardIssuanceDate    =  new Uint32Array(data.slice(offset, offset + 4));     offset = offset + 4; // 4 bytes
    var LastUsagePeriod     =  new Uint16Array(data.slice(offset, offset + 2));     offset = offset + 2; // 2 bytes
    var scvIssueInfomation_t = {
        "SVCIssueInformation" : {
            "CardIssuanceFee"     : CardIssuanceFee,
            "CardDeposit"         : CardDeposit[0],
            "CardExpiryDate"      : utils.dateFormat(CardExpiryDate[0]),
            "CardIssuanceDate"    : utils.dateFormat(CardIssuanceDate[0]),
            "LastUsagePeriod"     : LastUsagePeriod[0]
        }
    }
    return scvIssueInfomation_t;
}
// 7.11 CTP Issue Information 28 bytes
function ctpIssueInfo_t(data) {
    var offset = 0;
    var PassPrice                 =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3; // 3 bytes
    var PassValidityDurationMode  =  new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1; // 1 bytes
    var PassFirstUseExpiryDate    =  new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4; // 4 bytes
    var PassFixedStartDate        =  new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4; // 4 bytes
    var PassFixedEndDate          =  new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4; // 4 bytes
    var PassValidityDuration      =  new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2; // 2 bytes
    var NumberofTripsIssued       =  new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2; // 2 bytes
    var PassAverageTripFare       =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3; // 3 bytes
    var PassDailyTripLimit        =  new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2; // 2 bytes
    var PassBonusTrip             =  new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2; // 2 bytes
    var PassSlotNo                =  new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1; // 1 bytes
    var ctpIssueInfomation_t = {
        "CTPIssueInformation" : {
            "PassPrice"                 : PassPrice,
            "PassValidityDurationMode"  : PassValidityDurationMode[0],
            "PassFirstUseExpiryDate"    : utils.dateFormat(PassFirstUseExpiryDate[0]),
            "PassFixedStartDate"        : utils.dateFormat(PassFixedStartDate[0]),
            "PassFixedEndDate"          : utils.dateFormat(PassFixedEndDate[0]),
            "PassValidityDuration"      : PassValidityDuration[0],
            "NumberofTripsIssued"       : NumberofTripsIssued[0],
            "PassAverageTripFare"       : PassAverageTripFare,
            "PassDailyTripLimit"        : PassDailyTripLimit[0],
            "PassBonusTrip"             : PassBonusTrip[0],
            "PassSlotNo"                : PassSlotNo[0]
        } 
    }
    return ctpIssueInfomation_t;
}
// 7.12 Personalised Card Activation Information 
function personalisedCardActiveInfo_t(data) {
    var offset = 0;
    var ActivationStatus    =  new Uint8Array(data.slice(offset, offset + 1));  offset = offset + 1;  // 1 bytes
    var personalisedCardActiveInfo_t = {
        "PersonalisedCardActiveInformation" : {
          "ActivationStatus" : basetypes.Boolean_t(ActivationStatus)
        }
    }
    return personalisedCardActiveInfo_t;
}
// 7.13 STP Issue Information
function stpIssueInfo_t(data) {
  var offset = 0;
  var PassPrice                 =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3; // 3 bytes
  var PassValidityDurationMode  =  new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1; // 1 bytes
  var PassFirstUseExpiryDate    =  new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4; // 4 bytes
  var PassFixedStartDate        =  new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4; // 4 bytes
  var PassFixedEndDate          =  new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4; // 4 bytes
  var PassValidityDuration      =  new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2; // 2 bytes
  var NumberofTripsIssued       =  new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2; // 2 bytes
  var PassAverageTripFare       =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3; // 3 bytes
  var PassDailyTripLimit        =  new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2; // 2 bytes
  var PassBonusTime             =  new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1; // 1 bytes
  var PassSlotNo                =  new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1; // 1 bytes
  var stpIssueInfomation_t = {
      "STPIssueInformation" : {
          "PassPrice"                 : PassPrice,
          "PassValidityDurationMode"  : PassValidityDurationMode[0],
          "PassFirstUseExpiryDate"    : utils.dateFormat(PassFirstUseExpiryDate[0]),
          "PassFixedStartDate"        : utils.dateFormat(PassFixedStartDate[0]),
          "PassFixedEndDate"          : utils.dateFormat(PassFixedEndDate[0]),
          "PassValidityDuration"      : PassValidityDuration[0],
          "NumberofTripsIssued"       : NumberofTripsIssued[0],
          "PassAverageTripFare"       : PassAverageTripFare,
          "PassDailyTripLimit"        : PassDailyTripLimit[0],
          "PassBonusTime"             : PassBonusTime[0],
          "PassSlotNo"                : PassSlotNo[0]
      } 
  }
  return stpIssueInfomation_t;
}
// 7.14 Blacklist Information
function blacklistInfo_t(data) {
  var offset = 0;
  var BlacklistReasonCode    =  new Uint8Array(data.slice(offset, offset + 1));  offset = offset + 1;  // 1 bytes
  var blacklistInfomation_t = {
      "BlacklistInformation" : {
        "BlacklistReasonCode" : basetypes.BlacklistReasonCode_t(BlacklistReasonCode)
      }
  }
  return blacklistInfomation_t;
}
// 7.15 Rejection Information
function rejectionInfo_t(data) {
    var offset = 0;
    var RejectionCode    =  new Uint8Array(data.slice(offset, offset + 1));  offset = offset + 1;  // 1 bytes
    var rejectionInfomation_t = {
        "RejectionInformation" : {
          "RejectionCode" : basetypes.RejectCode_t(RejectionCode)
        }
    }
    return rejectionInfomation_t;
}
// 7.16 Entry Gate Information 
function entryGateInfo_t(data){
    var offset = 0;
    var EntryStationID       =  new Uint16Array(data.slice(offset, offset + 2));     offset = offset + 2; // 2 bytes
    var DegradeState         =  new Uint8Array(data.slice(offset, offset + 1));      offset = offset + 1; // 1 bytes
    var ArrayNumber          =  data.slice(offset, offset + 1);                      offset = offset + 1; // 1 bytes
    var entryGateInfomation_t = {
        "EntryGateInformation" : {
            "EntryStationID"  : EntryStationID[0],
            "DegradeState"    : basetypes.DegradeState_t(DegradeState[0]),
            "ArrayNumber"     : arrayBufferToHex(ArrayNumber)
        }
    }
    return entryGateInfomation_t;
}
// 7.17 Transaction Value Information
function transactionValueInfo_t(data){
    var offset = 0;
    var TransactionValue    =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;   // 4 bytes
    var transactionValueInformation_t = {
        "TransactionValueInformation" : {
          "TransactionValue" : TransactionValue[0]
        }
    }
    return transactionValueInformation_t;
}
// 7.18 Exit Gate Information
function exitGateInfo_t(data){
    var offset = 0;
    var TripFare                        =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3;  // 3 bytes
    var EntryStationID                  =   new Uint16Array(data.slice(offset, offset + 2));                  offset = offset + 2;  // 2 bytes
    var EntryEquipmentNumber            =   data.slice(offset, offset + 9);                                   offset = offset + 9;  // 9 bytes
    var ExitStationID                   =   new Uint16Array(data.slice(offset, offset + 2));                  offset = offset + 2;  // 2 bytes
    var DegradeState                    =   new Uint8Array(data.slice(offset, offset + 1));                   offset = offset + 1;  // 1 bytes
    var ArrayNumber                     =   data.slice(offset, offset + 1);                                   offset = offset + 1;  // 1 bytes
    var SourceParticipantID             =   new Uint16Array(data.slice(offset, offset + 2));                  offset = offset + 2;  // 2 bytes
    var DestinationParticipantID        =   new Uint16Array(data.slice(offset, offset + 2));                  offset = offset + 2;  // 2 bytes 
    var OriginalDestination             =   new Uint16Array(data.slice(offset, offset + 2));                  offset = offset + 2;  // 2 bytes
    var EntryTransactionDateandTime     =   new Uint32Array(data.slice(offset, offset + 4));                  offset = offset + 4;  // 4 bytes 
    var exitGateInformation_t = {
        "ExitGateInformation" : {
            "TripFare"                      : TripFare,
            "EntryStationID"                : EntryStationID[0],
            "EntryEquipmentNumber"          : utils.hexToAscii(arrayBufferToHex(EntryEquipmentNumber)),
            "ExitStationID"                 : ExitStationID[0],
            "DegradeState"                  : basetypes.DegradeState_t(DegradeState[0]),
            "ArrayNumber"                   : arrayBufferToHex(ArrayNumber),
            "SourceParticipantID"           : SourceParticipantID[0],
            "DestinationParticipantID"      : DestinationParticipantID[0],
            "OriginalDestination"           : OriginalDestination[0],
            "EntryTransactionDateandTime"   : utils.dateFormat(EntryTransactionDateandTime[0])
        }
    }
    return exitGateInformation_t;
}
// 7.19 SVC Upgrade Information
function svcUpgradeInfo_t(data){
    var offset = 0;
    var UpgradeReason                =   new Uint8Array(data.slice(offset, offset + 1));                   offset = offset + 1;  // 1 bytes
    var PenaltyCharged               =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3;  // 3 bytes
    var PenaltyCounter               =   new Uint8Array(data.slice(offset, offset + 1));                   offset = offset + 1;  // 1 bytes
    var PurseValueDeducted           =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3;  // 3 bytes
    var CashPaymentReceived          =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3;  // 3 bytes
    var BonusValueDeducted           =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3;  // 3 bytes
    var svcUpgradeInformation_t = {
        "SVCUpgradeInformation" : {
            "UpgradeReason"          : UpgradeReason[0],
            "PenaltyCharged"         : PenaltyCharged,
            "PenaltyCounter"         : PenaltyCounter[0],
            "PurseValueDeducted"     : PurseValueDeducted,
            "CashPaymentReceived"    : CashPaymentReceived,
            "BonusValueDeducted"     : BonusValueDeducted
        }
    }
    return svcUpgradeInformation_t;
}
// 7.20 Pass Upgrade Informatio
function passUpgradeInfo_t(data){
    var offset = 0;
    var UpgradeReason                =   new Uint8Array(data.slice(offset, offset + 1));                   offset = offset + 1;  // 1 bytes
    var PassAverageTripFare          =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3;  // 3 bytes
    var BonusTripDeductedFlag        =   basetypes.Boolean_t(data.slice(offset, offset + 1));              offset = offset + 1;  // 1 bytes
    var BonusTripRemainingCounter    =   new Uint8Array(data.slice(offset, offset + 1));                   offset = offset + 1;  // 1 bytes
    var BonusValueDeducted           =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3;  // 3 bytes
    var PenaltyCharged               =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3;  // 3 bytes
    var PurseValueDeducted           =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3;  // 3 bytes
    var CashPaymentReceived          =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3)); offset = offset + 3;  // 3 bytes
    var passUpgradeInformation_t = {
        "PassUpgradeInformation" : {
            "UpgradeReason"             : UpgradeReason[0],
            "PassAverageTripFare"       : PassAverageTripFare,
            "BonusTripDeductedFlag"     : BonusTripDeductedFlag,
            "BonusTripRemainingCounter" : BonusTripRemainingCounter[0],
            "PenaltyCharged"            : PenaltyCharged,
            "PurseValueDeducted"        : PurseValueDeducted,
            "CashPaymentReceived"       : CashPaymentReceived,
            "BonusValueDeducted"        : BonusValueDeducted  
        }
    }
    return passUpgradeInformation_t;
}
// 7.21 SVC Refund Information  60 Bytes
function svcRefundInfo_t(data){
    var offset = 0;
    var RefundReason             =   basetypes.RefundReason_t(data.slice(offset, offset + 1));           offset = offset + 1;  // 1 bytes
    var RefundServiceCharged     =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3;  // 3 bytes
    var CardDepositRefunded      =   new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2;  // 2 bytes
    var PurseValueRefunded       =   new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4;  // 4 bytes
    var RemainingPurseBonusValue =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3;  // 3 bytes
    var TotalCashRefundAmount    =   new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4;  // 4 bytes
    var DeferredRefund           =   basetypes.Boolean_t(data.slice(offset, offset + 1));                offset = offset + 1;  // 1 bytes
    var SurrenderReason          =   basetypes.SurrenderReason_t(data.slice(offset, offset + 1));        offset = offset + 1;  // 1 bytes
    var SurrenderDescription     =   data.slice(offset, offset + 41);                                    offset = offset + 41; // 41 bytes 
    var svcRefundInformation_t = {
        "SVCRefundInformation" : {
            "RefundReason"              :  RefundReason,
            "RefundServiceCharged"      :  RefundServiceCharged,
            "CardDepositRefunded"       :  CardDepositRefunded[0],
            "PurseValueRefunded"        :  PurseValueRefunded[0],
            "RemainingPurseBonusValue"  :  RemainingPurseBonusValue,
            "TotalCashRefundAmount"     :  TotalCashRefundAmount[0],
            "DeferredRefund"            :  DeferredRefund,
            "SurrenderReason"           :  SurrenderReason,
            "SurrenderDescription"      :  utils.hexToAscii(arrayBufferToHex(SurrenderDescription))
        }
    }
    return svcRefundInformation_t;
}
// 7.22 Pass Refund Information     57 bytes
function passRefundInfo_t(data){
    var offset = 0;
    var RefundReason             =   basetypes.RefundReason_t(data.slice(offset, offset + 1));           offset = offset + 1;  // 1 bytes
    var RefundServiceCharged     =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3;  // 3 bytes
    var UnusedTrip               =   new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2;  // 2 bytes
    var UnusedBonusTrip          =   new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2;  // 2 bytes
    var RefundAmount             =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3;  // 3 bytes
    var PassAverageTripFare      =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3;  // 3 bytes
    var DeferredRefund           =   basetypes.Boolean_t(data.slice(offset, offset + 1));                offset = offset + 1;  // 1 bytes
    var SurrenderReason          =   basetypes.SurrenderReason_t(data.slice(offset, offset + 1));        offset = offset + 1;  // 1 bytes
    var SurrenderDescription     =   data.slice(offset, offset + 41);                                    offset = offset + 41; // 41 bytes 
    var passRefundInformation_t = {
        "PassRefundInformation" : {
            "RefundReason"              :  RefundReason,
            "RefundServiceCharged"      :  RefundServiceCharged,
            "UnusedTrip"                :  UnusedTrip[0],
            "UnusedBonusTrip"           :  UnusedBonusTrip[0],
            "RefundAmount"              :  RefundAmount,
            "PassAverageTripFare"       :  PassAverageTripFare,
            "DeferredRefund"            :  DeferredRefund,
            "SurrenderReason"           :  SurrenderReason,
            "SurrenderDescription"      :  utils.hexToAscii(arrayBufferToHex(SurrenderDescription))
        }
    }
    return passRefundInformation_t;
}
// 7.23 SVC Replacement Information 25 bytes
function svcReplacemneInfo_t(data){
    var offset = 0;
    var ReplacementReason                   =   basetypes.RefundReason_t(data.slice(offset, offset + 1));           offset = offset + 1;  // 1 bytes
    var ReplacementServiceCharged           =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3;  // 3 bytes  
    var IssuerIDOfOldCard                   =   new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1;  // 1 bytes
    var CardIdOfOldCard                     =   utils.getCardId(data.slice(offset, offset + 5));                    offset = offset + 5;  // 5 bytes
    var MediaTypeOfOldCard                  =   new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1;  // 1 bytes
    var CardTypeOfOldCard                   =   new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1;  // 1 bytes
    var LifecycleCounterOfOldCard           =   new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1;  // 1 bytes
    var CardSequenceNumberOfOldCard         =   new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4;  // 4 bytes
    var CardDepositOfOldCard                =   new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2;  // 2 bytes
    var PurseValueOfOldCard                 =   new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4;  // 4 bytes
    var RemainingPurseBonusValueOfOldCard   =   new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2;  // 2 bytes
    var svcReplacemnetInformation_t = {
        "SVCRefundInformation" : {
            "ReplacementReason"                  :  ReplacementReason,
            "ReplacementServiceCharged"          :  ReplacementServiceCharged,
            "IssuerIDOfOldCard"                  :  IssuerIDOfOldCard[0],
            "CardIdOfOldCard"                    :  CardIdOfOldCard,
            "MediaTypeOfOldCard"                 :  MediaTypeOfOldCard[0],
            "CardTypeOfOldCard"                  :  CardTypeOfOldCard[0],
            "LifecycleCounterOfOldCard"          :  LifecycleCounterOfOldCard[0],
            "CardSequenceNumberOfOldCard"        :  CardSequenceNumberOfOldCard[0],
            "CardDepositOfOldCard"               :  CardDepositOfOldCard[0],
            "PurseValueOfOldCard"                :  PurseValueOfOldCard[0],
            "RemainingPurseBonusValueOfOldCard"  :  RemainingPurseBonusValueOfOldCard[0],
        }
    }
    return svcReplacemnetInformation_t;
}
// 7.24 CTP Replacement Information  27 bytes
function ctpReplacementInfo_t(data){
    var offset = 0;
    var ReplacementReason                   =   basetypes.RefundReason_t(data.slice(offset, offset + 1));           offset = offset + 1;  // 1 bytes
    var ReplacementServiceCharged           =   basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));   offset = offset + 3;  // 3 bytes  
    var PassIdentificationNumber            =   new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4;  // 4 bytes
    var SPIDofPassIssuer                    =   new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2;  // 2 bytes
    var PassStatus                          =   new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1;  // 1 bytes
    var PassTypeID                          =   new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1;  // 1 bytes
    var PassValidStartDate                  =   new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4;  // 4 bytes
    var PassValidEndDate                    =   new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4;  // 4 bytes
    var PassDailyTripCounter                =   new Uint8Array(data.slice(offset, offset + 1));                     offset = offset + 1;  // 1 bytes
    var PassRemainingTripCounter            =   new Uint16Array(data.slice(offset, offset + 2));                    offset = offset + 2;  // 2 bytes
    var PTSN                                =   new Uint32Array(data.slice(offset, offset + 4));                    offset = offset + 4;  // 4 bytes
    var ctpReplacementInformation_t = {
        "CTPReplacementInformation" : {
            "ReplacementReason"                  :  ReplacementReason,
            "ReplacementServiceCharged"          :  ReplacementServiceCharged,
            "PassIdentificationNumber"           :  PassIdentificationNumber[0],
            "SPIDofPassIssuer"                   :  SPIDofPassIssuer[0],
            "PassStatus"                         :  PassStatus[0],
            "PassTypeID"                         :  PassTypeID[0],
            "PassValidStartDate"                 :  utils.dateFormat(PassValidStartDate[0]),
            "PassValidEndDate"                   :  utils.dateFormat(PassValidEndDate[0]),
            "PassDailyTripCounter"               :  PassDailyTripCounter[0],
            "PassRemainingTripCounter"           :  PassRemainingTripCounter[0],
            "PTSN"                               :  PTSN[0]
        }
    }
    return ctpReplacementInformation_t;
}
// 7.25 Gift/Bonus Trip Redemption Information
function giftBonusTripRedempInfo_t(data){
    var offset = 0;
    var BonusPointUsed              =  new Uint16Array(data.slice(offset, offset + 2));             offset = offset + 2;  // 2 bytes
    var BonusPointRemaining         =  new Uint16Array(data.slice(offset, offset + 2));             offset = offset + 2;  // 2 bytes
    var RedemptionMode              =  basetypes.RedemptionMode_t(data.slice(offset, offset + 1));  offset = offset + 1;  // 1 bytes   
    var GiftItemIDRedeemed          =  new Uint8Array(data.slice(offset, offset + 1));              offset = offset + 1;  // 1 bytes
    var BonusRedeemed               =  new Uint16Array(data.slice(offset, offset + 2));             offset = offset + 2;  // 2 bytes
    var PassIdentificationNumber    =  new Uint32Array(data.slice(offset, offset + 4));             offset = offset + 4;  // 4 bytes
    var SPIDofPassIssuer            =  new Uint8Array(data.slice(offset, offset + 1));              offset = offset + 1;  // 1 bytes
    var PassTypeID                  =  new Uint8Array(data.slice(offset, offset + 1));              offset = offset + 1;  // 1 bytes
    var PassRemainingTripCounter    =  new Uint16Array(data.slice(offset, offset + 2));             offset = offset + 2;  // 2 bytes
    var bonusTripRedempInformation_t = {
        "GiftBonusTripRedemptionInfomation" : {
            "BonusPointUsed"            :   BonusPointUsed[0],
            "BonusPointRemaining"       :   BonusPointRemaining[0],
            "RedemptionMode"            :   RedemptionMode,
            "GiftItemIDRedeemed"        :   GiftItemIDRedeemed[0],
            "BonusRedeemed"             :   BonusRedeemed[0],
            "PassIdentificationNumber"  :   PassIdentificationNumber[0],
            "SPIDofPassIssuer"          :   SPIDofPassIssuer[0],
            "PassTypeID"                :   PassTypeID[0],
            "PassRemainingTripCounter"  :   PassRemainingTripCounter[0]
        }
    }
    return bonusTripRedempInformation_t;
}
// 7.26 Lucky Draw Redemption Information
function luckyDrawRedemptionInfo_t(data){
    var offset = 0;
    var LuckyDrawPrizeID    =  new Uint8Array(data.slice(offset, offset + 1));  offset = offset + 1;    // 1 bytes
    var luckyDrawRedemptionInfomation_t = {
        "LuckyDrawRedemptionInfomation" : {
          "LuckyDrawPrizeID" : LuckyDrawPrizeID[0]
        }
    }
    return luckyDrawRedemptionInfomation_t;
}
// 7.27 Promotion (Purse) Information
function pursePromotionInfo_t(data){
    var offset = 0;
    var Promotion1SchemeOwner     =  new Uint16Array(data.slice(offset, offset + 2));                   offset = offset + 2;  // 2 bytes
    var Promotion1SchemeID        =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion1Mode            =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion1Value           =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3;  // 3 bytes
    var Promotion2SchemeOwner     =  new Uint16Array(data.slice(offset, offset + 2));                   offset = offset + 2;  // 2 bytes
    var Promotion2SchemeID        =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion2Mode            =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion2Value           =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3;  // 3 bytes
    var PurseBonusValueRemaining  =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3;  // 3 bytes
    var pursePromotionInformation_t = {
        "PursePromotionInfomation" : {
            "Promotion1SchemeOwner"      :  Promotion1SchemeOwner[0],
            "Promotion1SchemeID"         :  Promotion1SchemeID[0],
            "Promotion1Mode"             :  Promotion1Mode[0],   
            "Promotion1Value"            :  Promotion1Value,
            "Promotion2SchemeOwner"      :  Promotion2SchemeOwner[0],
            "Promotion2SchemeID"         :  Promotion2SchemeID[0],
            "Promotion2Mode"             :  Promotion2Mode[0],   
            "Promotion2Value"            :  Promotion2Value,
            "PurseBonusValueRemaining"   :  PurseBonusValueRemaining,
        }
    }
    return pursePromotionInformation_t;
}
// 7.28 Transit Promotion Information  41  bytes
function transitPromotionInfo_t(data){
    var offset = 0;
    var Promotion1SchemeOwner     =  new Uint16Array(data.slice(offset, offset + 2));                   offset = offset + 2;  // 2 bytes
    var Promotion1SchemeID        =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion1Mode            =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion1Value           =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3;  // 3 bytes
    var Promotion2SchemeOwner     =  new Uint16Array(data.slice(offset, offset + 2));                   offset = offset + 2;  // 2 bytes
    var Promotion2SchemeID        =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion2Mode            =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion2Value           =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3;  // 3 bytes
    var Promotion3SchemeOwner     =  new Uint16Array(data.slice(offset, offset + 2));                   offset = offset + 2;  // 2 bytes
    var Promotion3SchemeID        =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion3Mode            =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion3Value           =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3;  // 3 bytes
    var Promotion4SchemeOwner     =  new Uint16Array(data.slice(offset, offset + 2));                   offset = offset + 2;  // 2 bytes
    var Promotion4SchemeID        =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion4Mode            =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var Promotion4Value           =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3;  // 3 bytes
    var BonusValueDeducted        =  basetypes.ValueOneUnitUnsigned_t(data.slice(offset, offset + 3));  offset = offset + 3;  // 3 bytes
    var BonusTripDeducted         =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var BonusPointsRemaining      =  new Uint16Array(data.slice(offset, offset + 2));                   offset = offset + 2;  // 2 bytes
    var BonusTripsRemaining       =  new Uint16Array(data.slice(offset, offset + 2));                   offset = offset + 2;  // 2 bytes
    var BonusValueRemaining       =  new Uint32Array(data.slice(offset, offset + 4));                   offset = offset + 4;  // 4 bytes
    var LuckyDrawPrizeID          =  new Uint8Array(data.slice(offset, offset + 1));                    offset = offset + 1;  // 1 bytes
    var transitPromotionInformation_t = {
        "TransitPromotionInfomation" : {
            "Promotion1SchemeOwner"      :  Promotion1SchemeOwner[0],
            "Promotion1SchemeID"         :  Promotion1SchemeID[0],
            "Promotion1Mode"             :  Promotion1Mode[0],   
            "Promotion1Value"            :  Promotion1Value,
            "Promotion2SchemeOwner"      :  Promotion2SchemeOwner[0],
            "Promotion2SchemeID"         :  Promotion2SchemeID[0],
            "Promotion2Mode"             :  Promotion2Mode[0],   
            "Promotion2Value"            :  Promotion2Value,
            "Promotion3SchemeOwner"      :  Promotion3SchemeOwner[0],
            "Promotion3SchemeID"         :  Promotion3SchemeID[0],
            "Promotion3Mode"             :  Promotion3Mode[0],   
            "Promotion3Value"            :  Promotion3Value,
            "Promotion4SchemeOwner"      :  Promotion4SchemeOwner[0],
            "Promotion4SchemeID"         :  Promotion4SchemeID[0],
            "Promotion4Mode"             :  Promotion4Mode[0],   
            "Promotion4Value"            :  Promotion4Value,
            "BonusValueDeducted"         :  BonusValueDeducted,
            "BonusTripDeducted"          :  BonusTripDeducted[0],
            "BonusPointsRemaining"       :  BonusPointsRemaining[0],
            "BonusTripsRemaining"        :  BonusTripsRemaining[0],
            "BonusValueRemaining"        :  BonusValueRemaining[0],
            "LuckyDrawPrizeID"           :  LuckyDrawPrizeID[0]
        }
    }
    return transitPromotionInformation_t;
}
// 7.29 Personalisation Information
function personalisationInfo_t(data){
    var offset = 0;
    var BatchNumber    =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;    // 2 bytes
    var personalisationInfomation_t = {
        "PersonalisationInfomation" : {
          "BatchNumber" : BatchNumber[0]
        }
    }
    return personalisationInfomation_t;
}
// 7.30 Cardholder Photo Information 
function cardholderPhotoInfo_t(data){
    var offset = 0;
    var PhotoLength           =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;  // 2 bytes
    var PhotoData             =  data.slice(offset,offset + PhotoLength[0]);
    var cardholderPhotoInformation_t = {
        "CardholderPhotoInformation" : {
            "PhotoLength"   : OperatorID[0],
            "PhotoData"     : arrayBufferToHex(PhotoData)
        }
    }
    return cardholderPhotoInformation_t;
}
// 7.33 POST Operational Information
function postOperationalInfo_t(data){
    var offset = 0;
    var OperatorID            =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var OperatorType          =  new Uint8Array(data.slice(offset, offset + 1));   offset = offset + 1;  // 1 bytes
    var ShiftSequenceNumber   =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var postOperationalInformation_t = {
        "POSTOperationalInformation" : {
            "OperatorID"            : OperatorID[0],
            "OperatorType"          : OperatorType[0],
            "ShiftSequenceNumber"   : ShiftSequenceNumber[0]
        }
    }
    return postOperationalInformation_t;
}
// 7.34 POST Shift Information
function postShiftInfo_t(data){
    var offset = 0;
    var OperatorID                     =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var ShiftSequenceNumber            =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var ShiftStartTime                 =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var ShiftEndTime                   =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var RepeatCountOfSale              =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;  // 2 bytes
    var repeatSale                     =  utils.repeatPOSTShiftInfo( "Sale",            RepeatCountOfSale[0],               data.slice(offset, offset + (10 * RepeatCountOfSale[0]) ) );
    offset = offset + (10 * RepeatCountOfSale[0]);      // 10 * count bytes
    var RepeatCountOfAddValue          =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;  // 2 bytes
    var repeatAddValue                 =  utils.repeatPOSTShiftInfo( "AddValue",        RepeatCountOfAddValue[0],           data.slice(offset, offset + (10 * RepeatCountOfAddValue[0]) ) );
    offset = offset + (10 * RepeatCountOfAddValue[0]);  // 10 * count bytes
    var RepeatCountOfAddPass           =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;  // 2 bytes
    var repeatAddPass                  =  utils.repeatPOSTShiftInfo( "AddPass",         RepeatCountOfAddPass[0],            data.slice(offset, offset + (12 * RepeatCountOfAddPass[0]) ) );
    offset = offset + (12 * RepeatCountOfAddPass[0]);   // 12 * count bytes
    var RepeatCountOfAdjustment        =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;  // 2 bytes
    var repeatAdjustment               =  utils.repeatPOSTShiftInfo( "Adjustment",      RepeatCountOfAdjustment[0],         data.slice(offset, offset + (12 * RepeatCountOfAdjustment[0]) ) );
    offset = offset + (12 * RepeatCountOfAdjustment[0]);  // 12 * count bytes
    var RepeatCountOfRefund            =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;  // 2 bytes
    var repeatRefund                   =  utils.repeatPOSTShiftInfo( "Refund",          RepeatCountOfRefund[0],             data.slice(offset, offset + (10 * RepeatCountOfRefund[0]) ) );
    offset = offset + (10 * RepeatCountOfRefund[0]);      //  10 * count bytes
    var RepeatCountOfReplacement       =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;  // 2 bytes
    var repeatReplacement              =  utils.repeatPOSTShiftInfo( "Replacement",     RepeatCountOfReplacement[0],        data.slice(offset, offset + (10 * RepeatCountOfReplacement)[0] ) );
    offset = offset + (10 * RepeatCountOfReplacement[0]);   //  10 * count bytes
    var RepeatCountOfEntryTransaction  =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;  // 2 bytes
    var repeatEntryTransaction         =  utils.repeatPOSTShiftInfo( "EntryTransaction", RepeatCountOfEntryTransaction[0],  data.slice(offset, offset + (10 * RepeatCountOfEntryTransaction)[0] ) );
    offset = offset + (6 * RepeatCountOfEntryTransaction[0]);   //  6 * count bytes
    var RepeatCountOfExitransaction    =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;  // 2 bytes
    var repeatExitTransaction          =  utils.repeatPOSTShiftInfo( "ExitTransaction",   RepeatCountOfExitransaction[0],   data.slice(offset, offset + (10 * RepeatCountOfExitransaction)[0] ) );
    offset = offset + (10 * RepeatCountOfExitransaction[0]);   //  10 * count bytes
    var TotalCashCollected             =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var TotalCreditCardCollected       =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var TotalVoucherQuantityCollected  =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var TotalVoucherCollected          =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var TotalDiscountCouponQuantityCollected   =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var TotalDiscountCouponCollected   =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var TotalPurseCollected            =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var RepeatCountOfStockMovement     =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;  // 2 bytes
    var repeatStockMovement            =  utils.repeatPOSTShiftInfo( "StockMovement",    RepeatCountOfStockMovement[0],   data.slice(offset, offset + (10 * RepeatCountOfStockMovement)[0] ) );
    offset = offset + (10 * RepeatCountOfStockMovement[0]);   //  10 * count bytes
    var ReceiptNumberStar             =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var ReceiptNumberEnd              =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var TotalCashCollectedVolume      =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var TotalCreditDebitCollectedVolume =  new Uint32Array(data.slice(offset, offset + 4));  offset = offset + 4;  // 4 bytes
    var postShiftInfomation_t = {
        "PostShiftInfomation" : {
            "OperatorID"                              : OperatorID[0],
            "ShiftSequenceNumber"                     : ShiftSequenceNumber[0],
            "ShiftStartTime"                          : utils.dateFormat(ShiftStartTime[0]),
            "ShiftEndTime"                            : utils.dateFormat(ShiftEndTime[0]),
            "RepeatCountOfSale"                       : RepeatCountOfSale[0],
            repeatSale,
            "RepeatCountOfAddValue"                   : RepeatCountOfAddValue[0],
            repeatAddValue,
            "RepeatCountOfAddPass"                    : RepeatCountOfAddPass[0],
            repeatAddPass,
            "RepeatCountOfAdjustment"                 : RepeatCountOfAdjustment[0],
            repeatAdjustment,
            "RepeatCountOfRefund"                     : RepeatCountOfRefund[0],
            repeatRefund,
            "RepeatCountOfReplacement"                : RepeatCountOfReplacement[0],
            repeatReplacement,
            "RepeatCountOfEntryTransaction"           : RepeatCountOfEntryTransaction[0],
            repeatEntryTransaction,
            "RepeatCountOfExitransaction"             : RepeatCountOfExitransaction[0],
            repeatExitTransaction,
            "TotalCashCollected"                      : TotalCashCollected[0],
            "TotalCreditCardCollected"                : TotalCreditCardCollected[0],
            "TotalVoucherQuantityCollected"           : TotalVoucherQuantityCollected[0],
            "TotalVoucherCollected"                   : TotalVoucherCollected[0],
            "TotalDiscountCouponQuantityCollected"    : TotalDiscountCouponQuantityCollected[0],
            "TotalDiscountCouponCollected"            : TotalDiscountCouponCollected[0],
            "TotalPurseCollected"                     : TotalPurseCollected[0],
            "RepeatCountOfStockMovement"              : RepeatCountOfStockMovement[0],
            repeatStockMovement,
            "ReceiptNumberStar"                       : ReceiptNumberStar[0],
            "ReceiptNumberEnd"                        : ReceiptNumberEnd[0],
            "TotalCashCollectedVolume"                : TotalCashCollectedVolume[0],
            "TotalCreditDebitCollectedVolume"         : TotalCreditDebitCollectedVolume[0]
        }
    }
    return postShiftInfomation_t;
}
// 7.35 Car Parking Information
function carParkingInfo_t(data){
    var offset = 0;
    var VehicleIdentifier   =  data.slice(offset, offset + 40);                   offset = offset + 40;
    var CarParkID           =  new Uint16Array(data.slice(offset, offset + 2));   offset = offset + 2;
    var carParkingInformation_t = {
        "CarParkingInformation" : {
          "VehicleIdentifier" : utils.hexToAscii(arrayBufferToHex(VehicleIdentifier)),
          "CarParkID"         : CarParkID[0]
        }
    }
    return carParkingInformation_t;
}
// 7.36 Card Holder Fee Information
function cardHolderFeeInfo_t(data){
    var offset = 0;
    var FeeType             =  new Uint8Array(data.slice(offset, offset + 1));    offset = offset + 1;
    var Reference           =  data.slice(offset, offset + 10);                   offset = offset + 10;
    var FeeChargeDateTime   =  new Uint32Array(data.slice(offset, offset + 4));   offset = offset + 4;
    var cardHolderFeeInformation_t = {
        "CardHolderFeeInformation" : {
          "FeeType"           : FeeType[0],
          "Reference"         : utils.hexToAscii(arrayBufferToHex(Reference)),
          "FeeChargeDateTime" : utils.dateFormat(FeeChargeDateTime[0])
        }
    }
    return cardHolderFeeInformation_t;
}
// 7.37 Tax and Discount Information
function taxAnddiscountInfo_t(data){
    var offset = 0;
    var TaxValue  =  data.slice(offset, offset + 10);                   offset = offset + 10;
    var Discount  =  new Uint32Array(data.slice(offset, offset + 4));   offset = offset + 4;
    var TaxCode   =  new Uint16Array(data.slice(offset, offset + 2));   offset = offset + 2;
    var taxAnddiscountInformation_t = {
      "taxAnddiscountInformation" : {
        "TaxValue"    : utils.hexToAscii(arrayBufferToHex(TaxValue)),
        "Discount"    : Discount[0],
        "TaxCode"     : TaxCode[0]
      }
    }
    return taxAnddiscountInformation_t;
} 
// 7.38 Invoice and Receipt Information
function inVoidandReceiptInfo_t(data){
    var offset = 0;
    var ReceiptPrinted           =  new Uint8Array(data.slice(offset, offset + 1));  offset = offset + 1;
    var ReceiptNumber    =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;
    var inVoidandReceiptInformation_t = {
        "InVoidandReceiptInformation" : {
          "ReceiptPrinted"    : basetypes.Boolean_t(ReceiptPrinted[0]),
          "ReceiptNumber"     : ReceiptNumber[0],
        }
    }
    return inVoidandReceiptInformation_t;
}
// 7.39 Origin Information
function originInfo_t(data){
    var offset = 0;
    var OriginLocation           =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;
    var OriginServiceProvider    =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;
    var originInformation_t = {
        "OriginInformation" : {
          "OriginLocation"         : OriginLocation[0],
          "OriginServiceProvider"  : OriginServiceProvider[0],
        }
    }
    return originInformation_t;
}
// 7.40 Key Version Information
function keyVersionInfo_t(data){
    var offset = 0;
    var NewKeyVersion    =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;
    var OldKeyVersion    =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;
    var keyVersionInformation_t = {
        "KeyVersionInformation" : {
          "NewKeyVersion" : NewKeyVersion[0],
          "OldKeyVersion" : OldKeyVersion[0],
        }
    }
    return keyVersionInformation_t;
}
// 7.41 P&R EP6 Barrier Open Information
function PNREP6BarrierOpenInfo_t(data){
  var offset = 0;
  var ReceiptNumber    =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;
  var VehicleID        =  new Uint16Array(data.slice(offset, offset + 2));  offset = offset + 2;
  var ReceiptPrinted   =  new Uint8Array(data.slice(offset, offset + 1));   offset = offset + 1;
  var PNREP6BarrierOpenInformation_t = {
      "PNREP6BarrierOpenInformation" : {
        "ReceiptNumber"   : ReceiptNumber[0],
        "VehicleID"       : VehicleID[0],
        "ReceiptPrinted"  : basetypes.Boolean_t(ReceiptPrinted[0])
      }
  }
  return PNREP6BarrierOpenInformation_t;
}
// sapre
function spare_t(data) {
    var hexSpare = arrayBufferToHex(data);
    var spare_t = {"SPARE" : hexSpare};
    return spare_t;
}
// 6.2.1 SVC Initialisation 
function txn_SVCInitialisation_t(buffer) {
    var offset = 0;
    var messageHeader    = messageHeader_t  (buffer.slice(offset, offset + header_length));       offset = offset + header_length;
    var cardInfo         = cardInfo_t       (buffer.slice(offset, offset + cardInfo_length));     offset = offset + cardInfo_length;
    var purseInfo        = purseInfo_t      (buffer.slice(offset, offset + purseInfo_length));    offset = offset + purseInfo_length;
    var initialInfo      = initialInfo_t    (buffer.slice(offset, offset + initialInfo_length));  offset = offset + initialInfo_length;
    var spare            = spare_t          (buffer.slice(offset, offset + 8));                   offset = offset + 8;          // SPARE 8 bytes
    var macInfo          = macInfo_t        (buffer.slice(offset, offset + macInfo_length));      offset = offset + macInfo_length;               
    var txndetails = Object.assign( 
      messageHeader, 
      cardInfo, 
      purseInfo, 
      initialInfo,
      spare, 
      macInfo
    );
    var messageObjs = {"SVCInitialisation" : [txndetails]};
    return messageObjs;
}
// 6.2.2 SVC Personalisation 
function txn_SVCPersonalisation_t(buffer) {
    var offset = 0;
    var messageHeader       = messageHeader_t       (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
    var cardInfo            = cardInfo_t            (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
    var purseInfo           = purseInfo_t           (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
    var lastAddValueInfo    = lastAddValueInfo_t    (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
    var personalInfo        = personalInfo_t        (buffer.slice(offset, offset + personalInfo_length));         offset = offset + personalInfo_length;
    var employeeInfo        = employeeInfo_t        (buffer.slice(offset, offset + employeeInfo_length));         offset = offset + employeeInfo_length;
    var personalisationInfo = personalisationInfo_t (buffer.slice(offset, offset + personalisationInfo_length));  offset = offset + personalisationInfo_length;
    var spare               = spare_t               (buffer.slice(offset, offset + 15));                          offset = offset + 15;   // SPARE 15 bytes
    var macInfo             = macInfo_t             (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
    var txndetails = Object.assign( 
        messageHeader, 
        cardInfo, 
        purseInfo,
        lastAddValueInfo,
        personalInfo,
        employeeInfo,
        personalisationInfo,
        spare, 
        macInfo
      );
    var messageObjs = {"SVCPersonalisation" : [txndetails]};
    return messageObjs;
}
// 6.2.3 Employee Card Personalisation
function txn_EPCardPersonalisation_t(buffer) {
    var offset = 0;
    var messageHeader       = messageHeader_t       (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
    var cardInfo            = cardInfo_t            (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
    var purseInfo           = purseInfo_t           (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
    var lastAddValueInfo    = lastAddValueInfo_t    (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
    var personalInfo        = personalInfo_t        (buffer.slice(offset, offset + personalInfo_length));         offset = offset + personalInfo_length;
    var employeeInfo        = employeeInfo_t        (buffer.slice(offset, offset + employeeInfo_length));         offset = offset + employeeInfo_length;
    var personalisationInfo = personalisationInfo_t (buffer.slice(offset, offset + personalisationInfo_length));  offset = offset + personalisationInfo_length;
    var spare               = spare_t               (buffer.slice(offset, offset + 15));                          offset = offset + 15;   // SPARE 15 bytes
    var macInfo             = macInfo_t             (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
    var txndetails = Object.assign( 
      messageHeader, 
      cardInfo, 
      purseInfo,
      lastAddValueInfo,
      personalInfo,
      employeeInfo,
      personalisationInfo,
      spare, 
      macInfo
    );
    var messageObjs = {"EPCardPersonalisation" : [txndetails]};
    return messageObjs;
}
// 6.2.4 Card Disposal
function txn_CardDisposal_t(buffer) {
    var offset = 0;
    var messageHeader       = messageHeader_t       (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
    var cardInfo            = cardInfo_t            (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
    var purseInfo           = purseInfo_t           (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
    var lastAddValueInfo    = lastAddValueInfo_t    (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
    var spare               = spare_t               (buffer.slice(offset, offset + 9));                          offset = offset + 9;   // SPARE 9 bytes
    var macInfo             = macInfo_t             (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
    var txndetails = Object.assign( 
      messageHeader, 
      cardInfo, 
      purseInfo,
      lastAddValueInfo,
      spare, 
      macInfo
    );
    var messageObjs = {"CardDisposal" : [txndetails]};
    return messageObjs;
}
// 6.2.5 Cardholder Photo Details 
function txn_CardHolderPhotoDetails_t(buffer) {
    var offset = 0;
    var messageHeader       = messageHeader_t       (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
    var cardInfo            = cardInfo_t            (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
    var purseInfo           = purseInfo_t           (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
    var lastAddValueInfo    = lastAddValueInfo_t    (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
    var cardholderPhotoInfo = cardholderPhotoInfo_t (buffer.slice(offset, offset + cardholderPhotoInfo_length));  offset = offset + cardholderPhotoInfo_length;
    var spare               = spare_t               (buffer.slice(offset, offset + 4));                           offset = offset + 4;   // SPARE 4 bytes
    var macInfo             = macInfo_t             (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
    var txndetails = Object.assign( 
      messageHeader, 
      cardInfo, 
      purseInfo,
      lastAddValueInfo,
      cardholderPhotoInfo,
      spare, 
      macInfo
    );
    var messageObjs = {"CardHolderPhotoDetails" : [txndetails]};
    return messageObjs;
}
// 6.3.1 SVC Issue    148 bytes
function txn_SVCIssue_t(buffer) {
    var offset = 0;
    var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));           offset = offset + header_length;
    var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));         offset = offset + cardInfo_length;
    var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));        offset = offset + purseInfo_length;
    var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length)); offset = offset + lastAddValueInfo_length;
    var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));    offset = offset + tranValueInfo_length;
    var paymentInfo          = paymentInfo_t          (buffer.slice(offset, offset + paymentInfo_length));      offset = offset + paymentInfo_length;
    var svcIssueInfo         = scvIssueInfo_t         (buffer.slice(offset, offset + svcIssueInfo_length));     offset = offset + svcIssueInfo_length;
    var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));  offset = offset + transitSpecInfo_length;
    var spare                = spare_t                (buffer.slice(offset, offset + 9));                       offset = offset + 9;                      // SPARE 9 bytes
    var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;               
    var txndetails = Object.assign( 
      messageHeader, 
      cardInfo, 
      purseInfo, 
      lastAddValueInfo, 
      transactionValueInfo,
      paymentInfo,
      svcIssueInfo,
      transitSpecInfo,
      spare, 
      macInfo
      );
    var messageObjs = {"SVCIssue" : [txndetails] };
    return messageObjs;
}
// 6.3.2 CTP Issue  183 bytes
function txn_CTPIssue_t(buffer) {
    var offset = 0;
    var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));           offset = offset + header_length;
    var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));         offset = offset + cardInfo_length;
    var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));        offset = offset + purseInfo_length;
    var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length)); offset = offset + lastAddValueInfo_length;
    var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));    offset = offset + tranValueInfo_length;
    var paymentInfo          = paymentInfo_t          (buffer.slice(offset, offset + paymentInfo_length));      offset = offset + paymentInfo_length;
    var passInfo             = passInfo_t             (buffer.slice(offset, offset + passInfo_length));         offset = offset + passInfo_length;
    var ctpIssueInfo         = ctpIssueInfo_t         (buffer.slice(offset, offset + ctpIssueInfo_length));     offset = offset + ctpIssueInfo_length;
    var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));  offset = offset + transitSpecInfo_length;
    var spare                = spare_t                (buffer.slice(offset, offset + 7));                       offset = offset + 7;                      // SPARE 9 bytes
    var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;               
    var txndetails = Object.assign( 
        messageHeader, 
        cardInfo, 
        purseInfo, 
        lastAddValueInfo, 
        transactionValueInfo,
        paymentInfo,
        passInfo,
        ctpIssueInfo,
        transitSpecInfo,
        spare, 
        macInfo
        );
    var messageObjs = {"CTPIssue" : [txndetails]};
    return messageObjs;
}
// 6.3.3 Personalised Card Activation  
function txn_PersonalisedCardActive_t(buffer) {
  var offset = 0;
  var messageHeader                     = messageHeader_t                   (buffer.slice(offset, offset + header_length));           offset = offset + header_length;
  var cardInfo                          = cardInfo_t                        (buffer.slice(offset, offset + cardInfo_length));         offset = offset + cardInfo_length;
  var purseInfo                         = purseInfo_t                       (buffer.slice(offset, offset + purseInfo_length));        offset = offset + purseInfo_length;
  var lastAddValueInfo                  = lastAddValueInfo_t                (buffer.slice(offset, offset + lastAddValueInfo_length)); offset = offset + lastAddValueInfo_length;
  var personalisedCardActivationInfo    = personalisedCardActiveInfo_t      (buffer.slice(offset, offset + 1));                       offset = offset + 1;
  var spare                             = spare_t                           (buffer.slice(offset, offset + 9));                       offset = offset + 9;                      // SPARE 9 bytes
  var macInfo                           = macInfo_t                         (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo, 
    lastAddValueInfo, 
    personalisedCardActivationInfo,
    spare, 
    macInfo
    );
  var messageObjs = {"PersonalisedCardActivation" : [txndetails]};
  return messageObjs;
}
// 6.3.5 EP Issue 
function txn_EPIssue_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));           offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));         offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));        offset = offset + purseInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length)); offset = offset + lastAddValueInfo_length;
  var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));    offset = offset + tranValueInfo_length;
  var paymentInfo          = paymentInfo_t          (buffer.slice(offset, offset + paymentInfo_length));      offset = offset + paymentInfo_length;
  var passInfo             = passInfo_t             (buffer.slice(offset, offset + passInfo_length));         offset = offset + passInfo_length;
  var stpIssueInfo         = stpIssueInfo_t         (buffer.slice(offset, offset + stpIssueInfo_length));     offset = offset + stpIssueInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 19));                      offset = offset + 19;                      // SPARE 19 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
      messageHeader, 
      cardInfo, 
      purseInfo, 
      lastAddValueInfo, 
      transactionValueInfo,
      paymentInfo,
      passInfo,
      stpIssueInfo,
      spare, 
      macInfo
      );
  var messageObjs = {"EPIssue" : [txndetails]};
  return messageObjs;
}
// 6.4.1 SVC Entry
function txn_SVCEntry_t(buffer) {
    var offset = 0;
    var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));           offset = offset + header_length;
    var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));         offset = offset + cardInfo_length;
    var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));        offset = offset + purseInfo_length;
    var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));  offset = offset + transitSpecInfo_length;
    var entryGateInfo        = entryGateInfo_t        (buffer.slice(offset, offset + entryGateInfo_length));    offset = offset + entryGateInfo_length;
    var carParkingInfo       = carParkingInfo_t       (buffer.slice(offset, offset + carParkingInfo_length));   offset = offset + carParkingInfo_length;
    var spare                = spare_t                (buffer.slice(offset, offset + 12));                      offset = offset + 12;                      // SPARE 12 bytes
    var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;               
    var txndetails = Object.assign( 
      messageHeader, 
      cardInfo, 
      purseInfo,
      transitSpecInfo,
      entryGateInfo,
      carParkingInfo,
      spare, 
      macInfo
    );
    var messageObjs = {"SVCEntry" : [txndetails]};
    return messageObjs;
}
// 6.4.5 CSC Block
function txn_CSCBlock_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));           offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));         offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));        offset = offset + purseInfo_length;
  var employeeInfo         = employeeInfo_t         (buffer.slice(offset, offset + employeeInfo_length));     offset = offset + employeeInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length)); offset = offset + lastAddValueInfo_length;
  var blacklistInfo        = blacklistInfo_t        (buffer.slice(offset, offset + blacklistInfo_length));    offset = offset + blacklistInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));  offset = offset + transitSpecInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 11));                      offset = offset + 11;                      // SPARE 11 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    employeeInfo,
    lastAddValueInfo,
    blacklistInfo,
    transitSpecInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"CSCBlock" : [txndetails]};
  return messageObjs;
}
// 6.4.6 CSC Rejection 
function txn_CSCRejection_t (buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));           offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));         offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));        offset = offset + purseInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length)); offset = offset + lastAddValueInfo_length;
  var rejectionInfo        = rejectionInfo_t        (buffer.slice(offset, offset + rejectionInfo_length));    offset = offset + rejectionInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));  offset = offset + transitSpecInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 11));                      offset = offset + 11;                      // SPARE 11 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    lastAddValueInfo,
    rejectionInfo,
    transitSpecInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"CSCRejection" : [txndetails]};
  return messageObjs;
}
// 6.4.7 CSC Unblock 
function txn_CSCUnBlock_t (buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));           offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));         offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));        offset = offset + purseInfo_length;
  var employeeInfo         = employeeInfo_t         (buffer.slice(offset, offset + employeeInfo_length));     offset = offset + employeeInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length)); offset = offset + lastAddValueInfo_length;
  var blacklistInfo        = blacklistInfo_t        (buffer.slice(offset, offset + blacklistInfo_length));    offset = offset + blacklistInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));  offset = offset + transitSpecInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 9));                       offset = offset + 11;                      // SPARE 11 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    lastAddValueInfo,
    blacklistInfo,
    employeeInfo,
    transitSpecInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"CSCUnBlock" : [txndetails]};
  return messageObjs;
}
// 6.4.9 Card Holder Fee 
function txn_CardHolderFee_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var cardHolderFeeInfo    = cardHolderFeeInfo_t    (buffer.slice(offset, offset + cardHolderFeeInfo_length));    offset = offset + cardHolderFeeInfo_length;
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    cardHolderFeeInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"CardHolderFee" : [txndetails]};
  return messageObjs;
}
// 6.5.1 SVC Add Value 
function txn_SVCAddValue_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));        offset = offset + tranValueInfo_length;
  var paymentInfo          = paymentInfo_t          (buffer.slice(offset, offset + paymentInfo_length));          offset = offset + paymentInfo_length;
  var promotionPurseInfo   = pursePromotionInfo_t   (buffer.slice(offset, offset + promotionPurseInfo_length));   offset = offset + promotionPurseInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 7));                           offset = offset + 7;     // SPARE 7 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    lastAddValueInfo,
    transactionValueInfo,
    paymentInfo,
    promotionPurseInfo,
    transitSpecInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"SVCAddValue" : [txndetails]};
  return messageObjs;
}
// 6.5.2 SVC Void Usage 
function txn_SVCVoidUsage_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));        offset = offset + tranValueInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 71));                          offset = offset + 71;     // SPARE 71 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    lastAddValueInfo,
    transactionValueInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"SVCVoidUsage" : [txndetails]};
  return messageObjs;
}
// 6.6.1 SVC Exit
function txn_SVCExit_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var paymentInfo          = paymentInfo_t          (buffer.slice(offset, offset + paymentInfo_length));          offset = offset + paymentInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));        offset = offset + tranValueInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var exitGateInfo         = exitGateInfo_t         (buffer.slice(offset, offset + exitGateInfo_length));         offset = offset + exitGateInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 5));                           offset = offset + 5;     // SPARE 5 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    paymentInfo,
    lastAddValueInfo,
    transactionValueInfo,
    transitSpecInfo,
    exitGateInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"SVCExit" : [txndetails]};
  return messageObjs;
}
// 6.6.2 CTP Exit
function txn_CTPExit_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var passInfo             = passInfo_t             (buffer.slice(offset, offset + passInfo_length));             offset = offset + passInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var exitGateInfo         = exitGateInfo_t         (buffer.slice(offset, offset + exitGateInfo_length));         offset = offset + exitGateInfo_length;
  var carParkingInfo       = carParkingInfo_t       (buffer.slice(offset, offset + carParkingInfo_length));       offset = offset + carParkingInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 5));                           offset = offset + 5;     // SPARE 5 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    lastAddValueInfo,
    passInfo,
    transitSpecInfo,
    exitGateInfo,
    carParkingInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"CTPExit" : [txndetails]};
  return messageObjs;
}
// 6.6.4 EP Exit
function txn_EPExit_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var employeeInfo         = employeeInfo_t         (buffer.slice(offset, offset + employeeInfo_length));         offset = offset + employeeInfo_length;
  var passInfo             = passInfo_t             (buffer.slice(offset, offset + passInfo_length));             offset = offset + passInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var exitGateInfo         = exitGateInfo_t         (buffer.slice(offset, offset + exitGateInfo_length));         offset = offset + exitGateInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 8));                           offset = offset + 8;     // SPARE 8 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    lastAddValueInfo,
    employeeInfo,
    passInfo,
    transitSpecInfo,
    exitGateInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"EPExit" : [txndetails]};
  return messageObjs;
}
// 6.6.5 SVC Upgrade
function txn_SVCUpgrade_t(buffer) {
  var offset = 0;
  // check a playload Version (1)
  var tdPayloadVersion     = new Uint8Array(data.slice(offset, offset + 1));
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var paymentInfo          = paymentInfo_t          (buffer.slice(offset, offset + paymentInfo_length));          offset = offset + paymentInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));        offset = offset + tranValueInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var svcUpgradeInfo       = svcRefundInfo_t        (buffer.slice(offset, offset + svcUpgradeInfo_length));       offset = offset + svcUpgradeInfo_length;
  if ( tdPayloadVersion == 2 )
  {
    var PNREP6BarrierOpenInfo = PNREP6BarrierOpenInfo_t (buffer.slice(offset, offset + PNREP6BarrierOpenInfo_length));    offset = offset + PNREP6BarrierOpenInfo_length;
    var macInfo                = macInfo_t              (buffer.slice(offset, offset + macInfo_length));                  offset = offset + macInfo_length;               
    var txndetails = Object.assign( 
      messageHeader, 
      cardInfo, 
      purseInfo,
      paymentInfo,
      lastAddValueInfo,
      transactionValueInfo,
      transitSpecInfo,
      svcUpgradeInfo,
      PNREP6BarrierOpenInfo,
      macInfo
    );
  }else{
    // default 1 ....
    var originInfo           = originInfo_t           (buffer.slice(offset, offset + originInfo_length));           offset = offset + originInfo_length;
    var spare                = spare_t                (buffer.slice(offset, offset + 1));                           offset = offset + 1;     // SPARE 1 bytes
    var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
    var txndetails = Object.assign( 
      messageHeader, 
      cardInfo, 
      purseInfo,
      paymentInfo,
      lastAddValueInfo,
      transactionValueInfo,
      transitSpecInfo,
      svcUpgradeInfo,
      originInfo,
      spare, 
      macInfo
      );
  }
  var messageObjs = {"SVCUpgrade" : [txndetails]};
  return messageObjs;
}
// 6.6.6 CTP Upgrade
function txn_CTPUpgrade_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));        offset = offset + tranValueInfo_length;
  var passInfo             = passInfo_t             (buffer.slice(offset, offset + passInfo_length));             offset = offset + passInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var passUpgradeInfo      = passUpgradeInfo_t      (buffer.slice(offset, offset + passUpgradeInfo_length));      offset = offset + passUpgradeInfo_length;
  var originInfo           = originInfo_t           (buffer.slice(offset, offset + originInfo_length));           offset = offset + originInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 1));                           offset = offset + 1;     // SPARE 1 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    paymentInfo,
    lastAddValueInfo,
    transactionValueInfo,
    passInfo,
    transitSpecInfo,
    passUpgradeInfo,
    originInfo,
    spare, 
    macInfo
    );
  var messageObjs = {"CTPUpgrade" : [txndetails]};
  return messageObjs;
}
// 6.6.8 SVC Exit with Promotion
function txn_SVCExitWithPromotion_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var paymentInfo          = paymentInfo_t          (buffer.slice(offset, offset + paymentInfo_length));          offset = offset + paymentInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));        offset = offset + tranValueInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var exitGateInfo         = exitGateInfo_t         (buffer.slice(offset, offset + exitGateInfo_length));         offset = offset + exitGateInfo_length;
  var transitPromotionInfo = transitPromotionInfo_t (buffer.slice(offset, offset + transitPromotionInfo_length)); offset = offset + transitPromotionInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 3));                           offset = offset + 3;     // SPARE 5 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    paymentInfo,
    lastAddValueInfo,
    transactionValueInfo,
    transitSpecInfo,
    exitGateInfo,
    transitPromotionInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"SVCExitWithPromotion" : [txndetails]};
  return messageObjs;
}
// 6.6.9 CTP Exit with Promotio
function txn_CTPExitWithPromotion_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));        offset = offset + tranValueInfo_length;
  var passInfo             = passInfo_t             (buffer.slice(offset, offset + passInfo_length));             offset = offset + passInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var exitGateInfo         = exitGateInfo_t         (buffer.slice(offset, offset + exitGateInfo_length));         offset = offset + exitGateInfo_length;
  var transitPromotionInfo = transitPromotionInfo_t (buffer.slice(offset, offset + transitPromotionInfo_length)); offset = offset + transitPromotionInfo_length;  
  var spare                = spare_t                (buffer.slice(offset, offset + 6));                           offset = offset + 6;     // SPARE 5 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader, 
    cardInfo, 
    purseInfo,
    lastAddValueInfo,
    transactionValueInfo,
    passInfo,
    transitSpecInfo,
    exitGateInfo,
    transitPromotionInfo,
    spare, 
    macInfo
  );
  var messageObjs = {"CTPExitWithPromotion" : [txndetails]};
  return messageObjs;
}
// 6.6.11 SVC Deduct
function txn_SVCDeduct_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));        offset = offset + tranValueInfo_length;
  var paymentInfo          = paymentInfo_t          (buffer.slice(offset, offset + paymentInfo_length));          offset = offset + paymentInfo_length;
  var promotionPurseInfo   = pursePromotionInfo_t   (buffer.slice(offset, offset + promotionPurseInfo_length));   offset = offset + promotionPurseInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var carParkingInfo       = carParkingInfo_t       (buffer.slice(offset, offset + carParkingInfo_length));       offset = offset + carParkingInfo_length;
  var taxAnddiscountInfo   = taxAnddiscountInfo_t   (buffer.slice(offset, offset + taxAnddiscountInfo_length));   offset = offset + taxAnddiscountInfo_length;
  var inVoidandReceiptInfo = inVoidandReceiptInfo_t (buffer.slice(offset, offset + inVoidandReceiptInfo_length)); offset = offset + inVoidandReceiptInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 7));                           offset = offset + 7;     // SPARE 7 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader,
    cardInfo,
    purseInfo,
    lastAddValueInfo,
    transactionValueInfo,
    paymentInfo,
    promotionPurseInfo,
    transitSpecInfo,
    carParkingInfo,
    taxAnddiscountInfo,
    inVoidandReceiptInfo,
    spare,
    macInfo
  );
  var messageObjs = {"SVCDeduct" : [txndetails]};
  return messageObjs;
}
// 6.7.1 SVC Refund
function txn_SVCRefund_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var purseInfo            = purseInfo_t            (buffer.slice(offset, offset + purseInfo_length));            offset = offset + purseInfo_length;
  var lastAddValueInfo     = lastAddValueInfo_t     (buffer.slice(offset, offset + lastAddValueInfo_length));     offset = offset + lastAddValueInfo_length;
  var transactionValueInfo = transactionValueInfo_t (buffer.slice(offset, offset + tranValueInfo_length));        offset = offset + tranValueInfo_length;
  var svcRefundInfo        = svcRefundInfo_t        (buffer.slice(offset, offset + svcRefundInfo_length));        offset = offset + svcRefundInfo_length;
  var employeeInfo         = employeeInfo_t         (buffer.slice(offset, offset + employeeInfo_length));         offset = offset + employeeInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var originInfo           = originInfo_t           (buffer.slice(offset, offset + originInfo_length));           offset = offset + originInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 5));                           offset = offset + 5;     // SPARE 5 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader,
    cardInfo,
    purseInfo,
    lastAddValueInfo,
    transactionValueInfo,
    svcRefundInfo,
    employeeInfo,
    transitSpecInfo,
    originInfo,
    spare,
    macInfo
    );
  var messageObjs = {"SVCRefund" : [txndetails]};
  return messageObjs;
}
// 6.7.2 CTP Refund
function txn_CTPRefund_t(buffer) {
  var offset = 0;
  var messageHeader        = messageHeader_t        (buffer.slice(offset, offset + header_length));               offset = offset + header_length;
  var cardInfo             = cardInfo_t             (buffer.slice(offset, offset + cardInfo_length));             offset = offset + cardInfo_length;
  var passInfo             = passInfo_t             (buffer.slice(offset, offset + passInfo_length));             offset = offset + passInfo_length;
  var passRefundInfo       = passRefundInfo_t       (buffer.slice(offset, offset + passRefundInfo_length));       offset = offset + passRefundInfo_length;
  var employeeInfo         = employeeInfo_t         (buffer.slice(offset, offset + employeeInfo_length));         offset = offset + employeeInfo_length;
  var transitSpecInfo      = transitSpecInfo_t      (buffer.slice(offset, offset + transitSpecInfo_length));      offset = offset + transitSpecInfo_length;
  var spare                = spare_t                (buffer.slice(offset, offset + 8));                           offset = offset + 8;     // SPARE 8 bytes
  var macInfo              = macInfo_t              (buffer.slice(offset, offset + macInfo_length));              offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader,
    cardInfo,
    passInfo,
    passRefundInfo,
    employeeInfo,
    transitSpecInfo,
    spare,
    macInfo
    );
  var messageObjs = {"CTPRefund" : [txndetails]};
  return messageObjs;
}
// 6.7.4 SVC Replacement 
function txn_SVCReplacement_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t             (buffer.slice(offset, offset + header_length));                   offset = offset + header_length;
  var cardInfo                = cardInfo_t                  (buffer.slice(offset, offset + cardInfo_length));                 offset = offset + cardInfo_length;
  var purseInfo               = purseInfo_t                 (buffer.slice(offset, offset + purseInfo_length));                offset = offset + purseInfo_length;
  var lastAddValueInfo        = lastAddValueInfo_t          (buffer.slice(offset, offset + lastAddValueInfo_length));         offset = offset + lastAddValueInfo_length;
  var transactionValueInfo    = transactionValueInfo_t      (buffer.slice(offset, offset + tranValueInfo_length));            offset = offset + tranValueInfo_length;
  var svcIssueInfo            = scvIssueInfo_t              (buffer.slice(offset, offset + svcIssueInfo_length));             offset = offset + svcIssueInfo_length;
  var svcReplacemneInfo       = svcReplacemneInfo_t         (buffer.slice(offset, offset + svcReplacemneInfo_length));        offset = offset + svcReplacemneInfo_length;
  var transitSpecInfo         = transitSpecInfo_t           (buffer.slice(offset, offset + transitSpecInfo_length));          offset = offset + transitSpecInfo_length;
  var spare                   = spare_t                     (buffer.slice(offset, offset + 8));                               offset = offset + 8;     // SPARE 8 bytes
  var macInfo                 = macInfo_t                   (buffer.slice(offset, offset + macInfo_length));                  offset = offset + macInfo_length;               
  var txndetails = Object.assign( 
    messageHeader,
    cardInfo,
    passInfo,
    purseInfo,
    lastAddValueInfo,
    transactionValueInfo,
    svcIssueInfo,
    svcReplacemneInfo,
    transitSpecInfo,
    spare,
    macInfo
    );
  var messageObjs = {"SVCReplacment" : [txndetails]};
  return messageObjs;
}
// 6.7.5 CTP Replacement 
function txn_CTPReplacement_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t             (buffer.slice(offset, offset + header_length));                   offset = offset + header_length;
  var cardInfo                = cardInfo_t                  (buffer.slice(offset, offset + cardInfo_length));                 offset = offset + cardInfo_length;
  var passInfo                = passInfo_t                  (buffer.slice(offset, offset + passInfo_length));                 offset = offset + passInfo_length;
  var ctpIssueInfo            = ctpIssueInfo_t              (buffer.slice(offset, offset + ctpIssueInfo_length));             offset = offset + ctpIssueInfo_length;
  var ctpReplacementInfo      = ctpReplacementInfo_t        (buffer.slice(offset, offset + ctpReplacementInfo_length));       offset = offset + ctpReplacementInfo_length;
  var transitSpecInfo         = transitSpecInfo_t           (buffer.slice(offset, offset + transitSpecInfo_length));          offset = offset + transitSpecInfo_length;
  var spare                   = spare_t                     (buffer.slice(offset, offset + 8));                               offset = offset + 8;     // SPARE 8 bytes
  var macInfo                 = macInfo_t                   (buffer.slice(offset, offset + macInfo_length));                  offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    cardInfo,
    passInfo,
    ctpIssueInfo,
    ctpReplacementInfo,
    transitSpecInfo,
    spare,
    macInfo
    );
  var messageObjs = {"CTPReplacment" : [txndetails]};
  return messageObjs;
}
// 6.8.1 Gift/Bonus Trip Redemption
function txn_GiftBonusTripRedemption_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t             (buffer.slice(offset, offset + header_length));                   offset = offset + header_length;
  var cardInfo                = cardInfo_t                  (buffer.slice(offset, offset + cardInfo_length));                 offset = offset + cardInfo_length;
  var giftBonusTripRedempInfo = giftBonusTripRedempInfo_t   (buffer.slice(offset, offset + giftBonusTripRedempInfo_length));  offset = offset + giftBonusTripRedempInfo_length;
  var transitSpecInfo         = transitSpecInfo_t           (buffer.slice(offset, offset + transitSpecInfo_length));          offset = offset + transitSpecInfo_length;
  var spare                   = spare_t                     (buffer.slice(offset, offset + 1));                               offset = offset + 1;     // SPARE 1 bytes
  var macInfo                 = macInfo_t                   (buffer.slice(offset, offset + macInfo_length));                  offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    cardInfo,
    giftBonusTripRedempInfo,
    transitSpecInfo,
    spare,
    macInfo
    );
  var messageObjs = {"GiftBonusTripRedemption" : [txndetails]};
  return messageObjs;
}
// 6.8.2 Lucky Draw Prize Redemption
function txn_LuckyDrawPrizeRedemption_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t           (buffer.slice(offset, offset + header_length));                   offset = offset + header_length;
  var cardInfo                = cardInfo_t                (buffer.slice(offset, offset + cardInfo_length));                 offset = offset + cardInfo_length;
  var luckyDrawRedemptionInfo = luckyDrawRedemptionInfo_t (buffer.slice(offset, offset + luckyDrawRedemptionInfo_length));  offset = offset + luckyDrawRedemptionInfo_length;
  var transitSpecInfo         = transitSpecInfo_t         (buffer.slice(offset, offset + transitSpecInfo_length));          offset = offset + transitSpecInfo_length;
  var spare                   = spare_t                   (buffer.slice(offset, offset + 15));                              offset = offset + 15;     // SPARE 15 bytes
  var macInfo                 = macInfo_t                 (buffer.slice(offset, offset + macInfo_length));                  offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    cardInfo,
    luckyDrawRedemptionInfo,
    transitSpecInfo,
    spare,
    macInfo
    );
  var messageObjs = {"LuckyDrawPrizeRedemption" : [txndetails]};
  return messageObjs;
}
// 6.9.1 CIPD Operator Shift Start
// 6.9.2 CIPD Operator Shift End
// 6.9.3 CIPD Operator Break Start
// 6.9.4 CIPD Operator Break End
// 6.9.5 POST Operator Shift Start 
function txn_POSTOperatorShiftStart_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t           (buffer.slice(offset, offset + header_length));                 offset = offset + header_length;
  var postOperationalInfo     = postOperationalInfo_t     (buffer.slice(offset, offset + postOperationalInfo_length));    offset = offset + postOperationalInfo_length;
  var spare                   = spare_t                   (buffer.slice(offset, offset + 9));                             offset = offset + 9;     // SPARE 9 bytes
  var macInfo                 = macInfo_t                 (buffer.slice(offset, offset + macInfo_length));                offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    postOperationalInfo,
    spare,
    macInfo
  );
  var messageObjs = {"POSTOperatorShiftStart" : [txndetails]};
  return messageObjs;
}
// 6.9.6 POST Operator Shift End
function txn_POSTOperatorShiftEnd_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t           (buffer.slice(offset, offset + header_length));                 offset = offset + header_length;
  var postOperationalInfo     = postOperationalInfo_t     (buffer.slice(offset, offset + postOperationalInfo_length));    offset = offset + postOperationalInfo_length;
  var postShiftInfo           = postShiftInfo_t           (buffer.slice(offset, offset + postShiftInfo_length));          offset = offset + postShiftInfo_length;
  var spare                   = spare_t                   (buffer.slice(offset, offset + 4));                             offset = offset + 4;     // SPARE 4 bytes
  var macInfo                 = macInfo_t                 (buffer.slice(offset, offset + macInfo_length));                offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    postOperationalInfo,
    postShiftInfo,
    spare,
    macInfo
  );
  var messageObjs = {"POSTOperatorShiftEnd" : [txndetails]};
  return messageObjs;
}
// 6.9.7 POST Operator Break Start
function txn_POSTOperatorBreakStart_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t           (buffer.slice(offset, offset + header_length));                 offset = offset + header_length;
  var postOperationalInfo     = postOperationalInfo_t     (buffer.slice(offset, offset + postOperationalInfo_length));    offset = offset + postOperationalInfo_length;
  var spare                   = spare_t                   (buffer.slice(offset, offset + 9));                             offset = offset + 9;     // SPARE 9 bytes
  var macInfo                 = macInfo_t                 (buffer.slice(offset, offset + macInfo_length));                offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    postOperationalInfo,
    spare,
    macInfo
  );
  var messageObjs = {"POSTOperatorBreakStart" : [txndetails]};
  return messageObjs;
}
// 6.9.8 POST Operator Break End
function txn_POSTOperatorBreakEnd_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t           (buffer.slice(offset, offset + header_length));                 offset = offset + header_length;
  var postOperationalInfo     = postOperationalInfo_t     (buffer.slice(offset, offset + postOperationalInfo_length));    offset = offset + postOperationalInfo_length;
  var spare                   = spare_t                   (buffer.slice(offset, offset + 9));                             offset = offset + 9;     // SPARE 9 bytes
  var macInfo                 = macInfo_t                 (buffer.slice(offset, offset + macInfo_length));                offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    postOperationalInfo,
    spare,
    macInfo
  );
  var messageObjs = {"POSTOperatorBreakEnd" : [txndetails]};
  return messageObjs;
}
// 6.9.9 P&R POST Operator Shift Start 
function txn_PNRPOSTOperatorShiftStart_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t           (buffer.slice(offset, offset + header_length));                 offset = offset + header_length;
  var postOperationalInfo     = postOperationalInfo_t     (buffer.slice(offset, offset + postOperationalInfo_length));    offset = offset + postOperationalInfo_length;
  var spare                   = spare_t                   (buffer.slice(offset, offset + 9));                             offset = offset + 9;     // SPARE 9 bytes
  var macInfo                 = macInfo_t                 (buffer.slice(offset, offset + macInfo_length));                offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    postOperationalInfo,
    spare,
    macInfo
  );
  var messageObjs = {"PNRPOSTOperatorShiftStart" : [txndetails]};
  return messageObjs;
}
// 6.9.10 P&R POST Operator Shift End
function txn_PNRPOSTOperatorShiftEnd_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t           (buffer.slice(offset, offset + header_length));                 offset = offset + header_length;
  var postOperationalInfo     = postOperationalInfo_t     (buffer.slice(offset, offset + postOperationalInfo_length));    offset = offset + postOperationalInfo_length;
  var postShiftInfo           = postShiftInfo_t           (buffer.slice(offset, offset + postShiftInfo_length));          offset = offset + postShiftInfo_length;
  var spare                   = spare_t                   (buffer.slice(offset, offset + 4));                             offset = offset + 4;     // SPARE 4 bytes
  var macInfo                 = macInfo_t                 (buffer.slice(offset, offset + macInfo_length));                offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    postOperationalInfo,
    postShiftInfo,
    spare,
    macInfo
  );
  var messageObjs = {"PNRPOSTOperatorShiftEnd" : [txndetails]};
  return messageObjs;
}
// 6.9.11 P&R POST Operator Break Start  
function txn_PNRPOSTOperatorBreakStart_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t           (buffer.slice(offset, offset + header_length));                 offset = offset + header_length;
  var postOperationalInfo     = postOperationalInfo_t     (buffer.slice(offset, offset + postOperationalInfo_length));    offset = offset + postOperationalInfo_length;
  var spare                   = spare_t                   (buffer.slice(offset, offset + 9));                             offset = offset + 9;     // SPARE 9 bytes
  var macInfo                 = macInfo_t                 (buffer.slice(offset, offset + macInfo_length));                offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    postOperationalInfo,
    spare,
    macInfo
  );
  var messageObjs = {"PNRPOSTOperatorBreakStart" : [txndetails]};
  return messageObjs;
}
// 6.9.12 P&R POST Operator Break End
function txn_PNRPOSTOperatorBreakEnd_t(buffer) {
  var offset = 0;
  var messageHeader           = messageHeader_t           (buffer.slice(offset, offset + header_length));                 offset = offset + header_length;
  var postOperationalInfo     = postOperationalInfo_t     (buffer.slice(offset, offset + postOperationalInfo_length));    offset = offset + postOperationalInfo_length;
  var spare                   = spare_t                   (buffer.slice(offset, offset + 9));                             offset = offset + 9;     // SPARE 9 bytes
  var macInfo                 = macInfo_t                 (buffer.slice(offset, offset + macInfo_length));                offset = offset + macInfo_length;               
  var txndetails = Object.assign(
    messageHeader,
    postOperationalInfo,
    spare,
    macInfo
  );
  var messageObjs = {"PNRPOSTOperatorBreakEnd" : [txndetails]};
  return messageObjs;
}
// 8.1.1 Gate Operation
function txn_AR_GateOperation_t(buffer) {
    var offset = 0;
    var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length)); offset = offset + header_length;
    var arId                                = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var arSequenceNumber                    = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var arGenerationDateTime                = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var csc1ComErrorCount                   = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var csc2ComErrorCount                   = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var csc1REWRErrorCount                  = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var csc2REWRErrorCount                  = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var tokenHopper1Quantity                = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var tokenHopper2Quantity                = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes     
    var tokenCapTotalQuantity               = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var tokenRejTotalQuantity               = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var PassengerEnteringTotalQuantity      = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var PassengerExitingTotalQuantity       = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var RejectedAtEntryTotalQuantity        = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var RejectedAtExitTotalQuantity         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TestTicketEntryTotalQuantity        = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TestTicketExitTotalQuantity         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var FreeExitTotalQuantity               = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCEntery              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatNumberOfCSCEntry              = utils.repeatAllCardType   ("NumberOfCSCEntryWith", buffer.slice(offset, offset + 128));     offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalNumberOfCSCRejectedAtEntry     = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCReadErrorAtEntry    = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes     
    var TotalNumberOfCSCWriteErrorAtEntry   = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCExit                = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatNumberOfCSCExit               = utils.repeatAllCardType   ("NumberOfCSCExitWith", buffer.slice(offset, offset + 128));      offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalNumberOfCSCRejectedAtExit      = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCReadErrorAtExit     = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCWriteErrorAtExit    = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCUnconfirmed         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCBlocked             = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalValueCSCDeductedAllCardTypes   = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatValueDeducted                 = utils.repeatAllCardType   ("ValueDeducted",       buffer.slice(offset, offset + 128));      offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalNumberOfCTPPassDeducted        = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatCTPPassDeducted               = utils.repeatAllCardType   ("NumberOfCTPPass",     buffer.slice(offset, offset + 128));      offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalAmountOfCTPPassDeducted        = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var BFCycleCount                        = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var HingedGateOpenCount                 = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var spare                               = spare_t        (buffer.slice(offset, offset + 84)); offset = offset + 84;       // SPARE 84 bytes
    var macInfo                             = macInfo_t      (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;     
    var txndetails = Object.assign( 
        messageHeader, 
        {"ARId"                                 : arId[0] },
        {"ARSequenceNumber"                     : arSequenceNumber[0]  },
        {"ARGenerationDateTime"                 : utils.dateFormat(arGenerationDateTime[0]) },
        {"CSCRW1CommunicationErrorCount"        : csc1ComErrorCount[0] },
        {"CSCRW2CommunicationErrorCount"        : csc2ComErrorCount[0] },
        {"CSCRW1readorwriteerrorcount"          : csc1REWRErrorCount[0] },
        {"CSCRW2readorwriteerrorcount"          : csc2REWRErrorCount[0] },
        {"TokenHopper1Quantity"                 : tokenHopper1Quantity[0] },
        {"TokenHopper2Quantity"                 : tokenHopper2Quantity[0] },
        {"TokenCapturedTotalQuantity"           : tokenCapTotalQuantity[0] },
        {"TokenRejectedTotalQuantity"           : tokenRejTotalQuantity[0] },
        {"PassengerEnteringTotalQuantity"       : PassengerEnteringTotalQuantity[0] },
        {"PassengerExitingTotalQuantity"        : PassengerExitingTotalQuantity[0] },
        {"RejectedAtEntryTotalQuantity"         : RejectedAtEntryTotalQuantity[0] },
        {"RejectedAtExitTotalQuantity"          : RejectedAtExitTotalQuantity[0] },
        {"TestTicketEntryTotalQuantity"         : TestTicketEntryTotalQuantity[0] },
        {"TestTicketExitTotalQuantity"          : TestTicketExitTotalQuantity[0] },
        {"FreeExitTotalQuantity"                : FreeExitTotalQuantity[0] },
        {"TotalNumberOfCSCEntery"               : TotalNumberOfCSCEntery[0] },
        repeatNumberOfCSCEntry,
        {"TotalNumberOfCSCRejectedAtEntry"      : TotalNumberOfCSCRejectedAtEntry[0] },
        {"TotalNumberOfCSCReadErrorAtEntry"     : TotalNumberOfCSCReadErrorAtEntry[0] },
        {"TotalNumberOfCSCWriteErrorAtEntry"    : TotalNumberOfCSCWriteErrorAtEntry[0] },
        {"TotalNumberOfCSCExit"                 : TotalNumberOfCSCExit[0] },
        repeatNumberOfCSCExit,
        {"TotalNumberOfCSCRejectedAtExit"       : TotalNumberOfCSCRejectedAtExit[0] },
        {"TotalNumberOfCSCReadErrorAtExit"      : TotalNumberOfCSCReadErrorAtExit[0] },
        {"TotalNumberOfCSCWriteErrorAtExit"     : TotalNumberOfCSCWriteErrorAtExit[0] },
        {"TotalNumberOfCSCUnconfirmed"          : TotalNumberOfCSCUnconfirmed[0] },
        {"TotalNumberOfCSCBlocked"              : TotalNumberOfCSCBlocked[0] },
        {"TotalValueCSCDeductedAllCardTypes"    : TotalValueCSCDeductedAllCardTypes[0] },  
        repeatValueDeducted,
        {"TotalNumberOfCTPPassDeducted"         : TotalNumberOfCTPPassDeducted[0] },
        repeatCTPPassDeducted,
        {"TotalAmountOfCTPPassDeducted"         : TotalAmountOfCTPPassDeducted[0] },
        {"BFCycleCount"                         : BFCycleCount[0] },
        {"HingedGateOpenCount"                  : HingedGateOpenCount[0] },
        spare, 
        macInfo
    );
    var messageObjs = {"ARGateOperation" : [txndetails]};
    return messageObjs;
}
// 8.1.2 TIM Operation 
function txn_AR_TIMOperation_t(buffer) {
    var messageObjs = {"ARTIMOperation" : [txndetails]};
    return messageObjs;
}
// 8.1.3 POST Operation
function txn_AR_POSTOperation_t(buffer) {
    var offset = 0;
    var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length)); offset = offset + header_length;    // 19 bytes 
    var arId                                = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var arSequenceNumber                    = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var operatorID                          = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var arGenerationDateTime                = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfCSCTransaction         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes 
    var CSCRWCommunicationErrorCount        = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var csc1REWRErrorCount                  = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var csc2REWRErrorCount                  = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var CSTIssuedTotalQuantity              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var CSTIssueTotalAmount                 = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var CSTExitUpgradeTotalQuantity         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var CSTExitUpgradeTotalAmount           = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var FreeExitIssuedTotalQuantity         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TestTicketIssuedTotalQuantity       = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var SVCIssuedTotalQuantity              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes   
    var SVCIssuedTotalAmount                = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var SVCAddValueTotalQuantity            = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var SVCAddValueTotalAmount              = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfReadError              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfWriteError             = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCWithInsufficientAddValueQuota  = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfEntriesWithCTPIssued   = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatNumberOfEntriesWithCTPIssued  = utils.repeatAllCardType   ("NumberOfEntriesWithCTPIssued", buffer.slice(offset, offset + 128));     offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalValueOfCTPIssued               = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfCTPIssued              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatNumberOfCSCIssued             = utils.repeatAllCardType   ("NumberOfCSCIssued", buffer.slice(offset, offset + 128));                offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalValueIssuedAllCardType         = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfCSCAddValue            = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var repeatNumberOfCSCAddValue           = utils.repeatAllCardType   ("NumberOfCSCAddValue", buffer.slice(offset, offset + 128));              offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalValueAddAllCardType            = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var repeatValueAddAllCardType           = utils.repeatAllCardType   ("ValueAdded", buffer.slice(offset, offset + 256));                       offset = offset + 256;  // 4 * [0-63] Bytes
    var ValueAddedByCash                    = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var ValueAddedByCreditCard              = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var ValueAddedByDebitCard               = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var ValueAddedByCoupon                  = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var ValueAddedByCashVoucher             = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfCSCRefund              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatNumberOfCSCRefund             = utils.repeatAllCardType   ("NumberOfCSCRefund", buffer.slice(offset, offset + 128));                offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalValueRefundAllCardType         = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var repeatValueRefundAllCardType        = utils.repeatAllCardType   ("ValueRefund", buffer.slice(offset, offset + 256));                      offset = offset + 256;  // 4 * [0-63] Bytes
    var TotalNumberOfCSCReplaced            = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalValueReplaceforAllCardType     = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfCSCEntryExitUpgradedFree   = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;   // 2 bytes
    var TotalNumberOfCSCEntryExitUpgradedCharge = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;   // 2 bytes
    var TotalValueOfCSCEntryExitUpgradedCharge  = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;   // 4 bytes   
    var TotalNumberOfCSCExcessTimeUpgrade       = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;   // 2 bytes
    var TotalValueOfCSCExcessTimeUpgrade        = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;   // 4 bytes 
    var TotalNumberOfCSCExcessFareUpgrade       = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;   // 2 bytes
    var TotalValueOfCSCExcessFareUpgrade        = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;   // 4 bytes 
    var TotalNumberOfPersonalisedCardActivation = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;   // 2 bytes
    var spare                               = spare_t        (buffer.slice(offset, offset + 100));              offset = offset + 100;              // SPARE 100 bytes
    var macInfo                             = macInfo_t      (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length;   // 5 bytes   
    var txndetails = Object.assign( 
      messageHeader, 
      {"ARId"                            :  arId[0] },
      {"ARSequenceNumber"                :  arSequenceNumber[0]  },
      {"OperatorID"                      :  operatorID[0]  },
      {"ARGenerationDateTime"            :  utils.dateFormat(arGenerationDateTime[0]) },
      {"TotalNumberOfCSCTransaction"     :  TotalNumberOfCSCTransaction[0] },
      {"CSCRWCommunicationErrorCount"    :  CSCRWCommunicationErrorCount[0] },
      {"CSCRW1ReadWriteErrorCount"       :  csc1REWRErrorCount[0] },
      {"CSCRW2ReadWriteErrorCount"       :  csc2REWRErrorCount[0] },
      {"CSTIssuedTotalQuantity"          :  CSTIssuedTotalQuantity[0] },
      {"CSTIssueTotalAmount"             :  CSTIssueTotalAmount[0] },
      {"CSTExitUpgradeTotalQuantity"     :  CSTExitUpgradeTotalQuantity[0] },
      {"CSTExitUpgradeTotalAmount"       :  CSTExitUpgradeTotalAmount[0] },
      {"FreeExitIssuedTotalQuantity"     :  FreeExitIssuedTotalQuantity[0] },
      {"TestTicketIssuedTotalQuantity"   :  TestTicketIssuedTotalQuantity[0] },
      {"SVCIssuedTotalQuantity"          :  SVCIssuedTotalQuantity[0] },
      {"SVCIssuedTotalAmount"            :  SVCIssuedTotalAmount[0] },
      {"SVCAddValueTotalQuantity"        :  SVCAddValueTotalQuantity[0] },
      {"SVCAddValueTotalAmount"          :  SVCAddValueTotalAmount[0] },
      {"TotalNumberOfReadError"          :  TotalNumberOfReadError[0] },
      {"TotalNumberOfWriteError"         :  TotalNumberOfWriteError[0] },
      {"TotalNumberOfCSCWithInsufficientAddValueQuota"  :   TotalNumberOfCSCWithInsufficientAddValueQuota[0] },
      {"TotalNumberOfEntriesWithCTPIssued"              :   TotalNumberOfEntriesWithCTPIssued[0] },
      repeatNumberOfEntriesWithCTPIssued,
      {"TotalValueOfCTPIssued"           :   TotalValueOfCTPIssued[0] },
      {"TotalNumberOfCTPIssued"          :   TotalNumberOfCTPIssued[0] },
      repeatNumberOfCSCIssued,
      {"TotalValueIssuedAllCardType"     :   TotalValueIssuedAllCardType[0] },
      {"TotalNumberOfCSCAddValue"        :   TotalNumberOfCSCAddValue[0] },
      repeatNumberOfCSCAddValue,
      {"TotalValueAddAllCardType"        :   TotalValueAddAllCardType[0] },
      repeatValueAddAllCardType,
      {"ValueAddedByCash"                :   ValueAddedByCash[0] },
      {"ValueAddedByCreditCard"          :   ValueAddedByCreditCard[0] },
      {"ValueAddedByDebitCard"           :   ValueAddedByDebitCard[0] },
      {"ValueAddedByCoupon"              :   ValueAddedByCoupon[0] },
      {"ValueAddedByCashVoucher"         :   ValueAddedByCashVoucher[0] },
      {"TotalNumberOfCSCRefund"          :   TotalNumberOfCSCRefund[0]},
      repeatNumberOfCSCRefund,
      {"TotalValueRefundAllCardType"     :   TotalValueRefundAllCardType[0] },
      repeatValueRefundAllCardType,
      {"TotalNumberOfCSCReplaced"                     :   TotalNumberOfCSCReplaced[0] },
      {"TotalValueReplaceforAllCardType"              :   TotalValueReplaceforAllCardType[0] },
      {"TotalNumberOfCSCEntryExitUpgradedFree"        :   TotalNumberOfCSCEntryExitUpgradedFree[0] },
      {"TotalNumberOfCSCEntryExitUpgradedCharge"      :   TotalNumberOfCSCEntryExitUpgradedCharge[0] },
      {"TotalValueOfCSCEntryExitUpgradedCharge"       :   TotalValueOfCSCEntryExitUpgradedCharge[0] },
      {"TotalNumberOfCSCExcessTimeUpgrade"            :   TotalNumberOfCSCExcessTimeUpgrade[0] },
      {"TotalValueOfCSCExcessTimeUpgrade"             :   TotalValueOfCSCExcessTimeUpgrade[0] },
      {"TotalNumberOfCSCExcessFareUpgrade"            :   TotalNumberOfCSCExcessFareUpgrade[0] },
      {"TotalValueOfCSCExcessFareUpgrade"             :   TotalValueOfCSCExcessFareUpgrade[0] },
      {"TotalNumberOfPersonalisedCardActivation"      :   TotalNumberOfPersonalisedCardActivation[0] },
      spare, 
      macInfo
    );
    var messageObjs = {"ARPOSTOperation" : [txndetails]};
    return messageObjs;
}
// 8.1.4 P&R POST Operation
function txn_AR_PNRPOSTOperation_t(buffer) {
    var offset = 0;
    var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length)); offset = offset + header_length;  // 19 bytes 
    var arId                                = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var arSequenceNumber                    = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var operatorID                          = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var arGenerationDateTime                = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfCSCTransaction         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes 
    var CSCRWCommunicationErrorCount        = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var csc1REWRErrorCount                  = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var csc2REWRErrorCount                  = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var CSTIssuedTotalQuantity              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var CSTIssueTotalAmount                 = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var CSTExitUpgradeTotalQuantity         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var CSTExitUpgradeTotalAmount           = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var FreeExitIssuedTotalQuantity         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TestTicketIssuedTotalQuantity       = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var SVCIssuedTotalQuantity              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes   
    var SVCIssuedTotalAmount                = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var SVCAddValueTotalQuantity            = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var SVCAddValueTotalAmount              = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfReadError              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfWriteError             = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCWithInsufficientAddValueQuota  = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfEntriesWithCTPIssued   = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatNumberOfEntriesWithCTPIssued  = utils.repeatAllCardType   ("NumberOfEntriesWithCTPIssued", buffer.slice(offset, offset + 128));     offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalValueOfCTPIssued               = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfCTPIssued              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatNumberOfCSCIssued             = utils.repeatAllCardType   ("NumberOfCSCIssued", buffer.slice(offset, offset + 128));                offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalValueIssuedAllCardType         = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfCSCAddValue            = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var repeatNumberOfCSCAddValue           = utils.repeatAllCardType   ("NumberOfCSCAddValue", buffer.slice(offset, offset + 128));              offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalValueAddAllCardType            = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var repeatValueAddAllCardType           = utils.repeatAllCardType   ("ValueAdded", buffer.slice(offset, offset + 256));                       offset = offset + 256;  // 4 * [0-63] Bytes
    var ValueAddedByCash                    = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var ValueAddedByCreditCard              = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var ValueAddedByDebitCard               = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var ValueAddedByCoupon                  = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var ValueAddedByVoucher                 = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var ValueAddedByCashVoucher             = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfCSCRefund              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatNumberOfCSCRefund             = utils.repeatAllCardType   ("NumberOfCSCRefund", buffer.slice(offset, offset + 128));                offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalValueRefundAllCardType         = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var repeatValueRefundAllCardType        = utils.repeatAllCardType   ("ValueRefund", buffer.slice(offset, offset + 256));                      offset = offset + 256;  // 4 * [0-63] Bytes
    var TotalNumberOfCSCReplaced            = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalValueReplaceforAllCardType     = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var TotalNumberOfCSCEntryExitUpgradedFree   = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;   // 2 bytes
    var TotalNumberOfCSCEntryExitUpgradedCharge = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;   // 2 bytes
    var TotalValueOfCSCEntryExitUpgradedCharge  = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;   // 4 bytes   
    var TotalNumberOfCSCExcessTimeUpgrade       = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;   // 2 bytes
    var TotalValueOfCSCExcessTimeUpgrade        = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;   // 4 bytes 
    var TotalNumberOfCSCExcessFareUpgrade       = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;   // 2 bytes
    var TotalValueOfCSCExcessFareUpgrade        = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;   // 4 bytes 
    var TotalNumberOfPersonalisedCardActivation = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;   // 2 bytes
    var spare                               = spare_t        (buffer.slice(offset, offset + 100));              offset = offset + 100;              // SPARE 100 bytes
    var macInfo                             = macInfo_t      (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length;   // 5 bytes   
    var txndetails = Object.assign( 
      messageHeader, 
      {"ARId"                            :  arId[0] },
      {"ARSequenceNumber"                :  arSequenceNumber[0]  },
      {"OperatorID"                      :  operatorID[0]  },
      {"ARGenerationDateTime"            :  utils.dateFormat(arGenerationDateTime[0]) },
      {"TotalNumberOfCSCTransaction"     :  TotalNumberOfCSCTransaction[0] },
      {"CSCRWCommunicationErrorCount"    :  CSCRWCommunicationErrorCount[0] },
      {"CSCRW1ReadWriteErrorCount"       :  csc1REWRErrorCount[0] },
      {"CSCRW2ReadWriteErrorCount"       :  csc2REWRErrorCount[0] },
      {"CSTIssuedTotalQuantity"          :  CSTIssuedTotalQuantity[0] },
      {"CSTIssueTotalAmount"             :  CSTIssueTotalAmount[0] },
      {"CSTExitUpgradeTotalQuantity"     :  CSTExitUpgradeTotalQuantity[0] },
      {"CSTExitUpgradeTotalAmount"       :  CSTExitUpgradeTotalAmount[0] },
      {"FreeExitIssuedTotalQuantity"     :  FreeExitIssuedTotalQuantity[0] },
      {"TestTicketIssuedTotalQuantity"   :  TestTicketIssuedTotalQuantity[0] },
      {"SVCIssuedTotalQuantity"          :  SVCIssuedTotalQuantity[0] },
      {"SVCIssuedTotalAmount"            :  SVCIssuedTotalAmount[0] },
      {"SVCAddValueTotalQuantity"        :  SVCAddValueTotalQuantity[0] },
      {"SVCAddValueTotalAmount"          :  SVCAddValueTotalAmount[0] },
      {"TotalNumberOfReadError"          :  TotalNumberOfReadError[0] },
      {"TotalNumberOfWriteError"         :  TotalNumberOfWriteError[0] },
      {"TotalNumberOfCSCWithInsufficientAddValueQuota"  :   TotalNumberOfCSCWithInsufficientAddValueQuota[0] },
      {"TotalNumberOfEntriesWithCTPIssued"              :   TotalNumberOfEntriesWithCTPIssued[0] },
      repeatNumberOfEntriesWithCTPIssued,
      {"TotalValueOfCTPIssued"           :   TotalValueOfCTPIssued[0] },
      {"TotalNumberOfCTPIssued"          :   TotalNumberOfCTPIssued[0] },
      repeatNumberOfCSCIssued,
      {"TotalValueIssuedAllCardType"     :   TotalValueIssuedAllCardType[0] },
      {"TotalNumberOfCSCAddValue"        :   TotalNumberOfCSCAddValue[0] },
      repeatNumberOfCSCAddValue,
      {"TotalValueAddAllCardType"        :   TotalValueAddAllCardType[0] },
      repeatValueAddAllCardType,
      {"ValueAddedByCash"                :   ValueAddedByCash[0] },
      {"ValueAddedByCreditCard"          :   ValueAddedByCreditCard[0] },
      {"ValueAddedByDebitCard"           :   ValueAddedByDebitCard[0] },
      {"ValueAddedByCoupon"              :   ValueAddedByCoupon[0] },
      {"ValueAddedByVoucher"             :   ValueAddedByVoucher[0] },
      {"ValueAddedByCashVoucher"         :   ValueAddedByCashVoucher[0] },
      {"TotalNumberOfCSCRefund"          :   TotalNumberOfCSCRefund[0]},
      repeatNumberOfCSCRefund,
      {"TotalValueRefundAllCardType"     :   TotalValueRefundAllCardType[0] },
      repeatValueRefundAllCardType,
      {"TotalNumberOfCSCReplaced"        :   TotalNumberOfCSCReplaced[0] },
      {"TotalValueReplaceforAllCardType" :   TotalValueReplaceforAllCardType[0] },
      {"TotalNumberOfCSCEntryExitUpgradedFree"        :   TotalNumberOfCSCEntryExitUpgradedFree[0] },
      {"TotalNumberOfCSCEntryExitUpgradedCharge"      :   TotalNumberOfCSCEntryExitUpgradedCharge[0] },
      {"TotalValueOfCSCEntryExitUpgradedCharge"       :   TotalValueOfCSCEntryExitUpgradedCharge[0] },
      {"TotalNumberOfCSCExcessTimeUpgrade"            :   TotalNumberOfCSCExcessTimeUpgrade[0] },
      {"TotalValueOfCSCExcessTimeUpgrade"             :   TotalValueOfCSCExcessTimeUpgrade[0] },
      {"TotalNumberOfCSCExcessFareUpgrade"            :   TotalNumberOfCSCExcessFareUpgrade[0] },
      {"TotalValueOfCSCExcessFareUpgrade"             :   TotalValueOfCSCExcessFareUpgrade[0] },
      {"TotalNumberOfPersonalisedCardActivation"      :   TotalNumberOfPersonalisedCardActivation[0] },
      spare, 
      macInfo
    );
    var messageObjs = {"ARPNRPOSTOperation" : [txndetails]};
    return messageObjs;
}
// 8.1.5 CIPD Operation 
// 8.1.6 CRD Operation 
function txn_AR_CRDOperation_t(buffer) {
    var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length)); offset = offset + header_length;
    var arId                                = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var arSequenceNumber                    = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var operatorID                          = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var arGenerationDateTime                = new Uint32Array(buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
    var cscComErrorCount                    = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCTransaction         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes 
    var TotalNumberOfReadError              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfWriteError             = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var PassengerEnteringTotalQuantity      = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var PassengerExitingTotalQuantity       = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var RejectedAtEntryTotalQuantity        = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var RejectedAtExitTotalQuantity         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TestTicketEntryTotalQuantity        = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TestTicketExitTotalQuantity         = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCEntery              = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatNumberOfCSCEntry              = utils.repeatAllCardType   ("NumberOfCSCEntryWith", buffer.slice(offset, offset + 128));     offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalNumberOfCSCRejectedAtEntry     = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCReadErrorAtEntry    = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes     
    var TotalNumberOfCSCWriteErrorAtEntry   = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var TotalNumberOfCSCExit                = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatNumberOfCSCExit               = utils.repeatAllCardType   ("NumberOfCSCExitWith", buffer.slice(offset, offset + 128));      offset = offset + 128;  // 2 * [0-63] Bytes
    var TotalNumberOfCTPPassDeducted        = new Uint16Array(buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
    var repeatCTPPassDeducted               = utils.repeatAllCardType   ("NumberOfCTPPass",     buffer.slice(offset, offset + 128));      offset = offset + 128;  // 2 * [0-63] Bytes
    var macInfo                             = macInfo_t      (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;     
    var txndetails = Object.assign( 
        messageHeader, 
        {"ARId"                                 : arId[0] },
        {"ARSequenceNumber"                     : arSequenceNumber[0]  },
        {"OperatorID"                           : operatorID[0] },
        {"ARGenerationDateTime"                 : utils.dateFormat(arGenerationDateTime[0]) },
        {"CSCRWCommunicationErrorCount"         : cscComErrorCount[0] },
        {"TotalNumberOfCSCTransaction"          : TotalNumberOfCSCTransaction[0] },
        {"TotalNumberOfReadError"               : TotalNumberOfReadError[0] },
        {"TotalNumberOfWriteError"              : TotalNumberOfWriteError[0] },
        {"PassengerEnteringTotalQuantity"       : PassengerEnteringTotalQuantity[0] },
        {"PassengerExitingTotalQuantity"        : PassengerExitingTotalQuantity[0] },
        {"RejectedAtEntryTotalQuantity"         : RejectedAtEntryTotalQuantity[0] },
        {"RejectedAtExitTotalQuantity"          : RejectedAtExitTotalQuantity[0] },
        {"TestTicketEntryTotalQuantity"         : TestTicketEntryTotalQuantity[0] },
        {"TestTicketExitTotalQuantity"          : TestTicketExitTotalQuantity[0] },
        {"TotalNumberOfCSCEntery"               : TotalNumberOfCSCEntery[0] },
        repeatNumberOfCSCEntry,
        {"TotalNumberOfCSCRejectedAtEntry"      : TotalNumberOfCSCRejectedAtEntry[0] },
        {"TotalNumberOfCSCReadErrorAtEntry"     : TotalNumberOfCSCReadErrorAtEntry[0] },
        {"TotalNumberOfCSCWriteErrorAtEntry"    : TotalNumberOfCSCWriteErrorAtEntry[0] },
        {"TotalNumberOfCSCExit"                 : TotalNumberOfCSCExit[0] },
        repeatNumberOfCSCExit,
        {"TotalNumberOfCTPPassDeducted"         : TotalNumberOfCTPPassDeducted[0] },  
        repeatCTPPassDeducted,
        macInfo
    );
  var messageObjs = {"ARCRDOperation" : [txndetails]};
  return messageObjs;
}
// 8.1.7 RVCT Operation
function txn_AR_RVCTOperation_t(buffer) {
  var offset = 0;
  var messageHeader         = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;    // 19 bytes
  var arId                  = new Uint16Array   (buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
  var arSequenceNumber      = new Uint16Array   (buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
  var operatorID            = new Uint32Array   (buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
  var arGenerationDateTime  = new Uint32Array   (buffer.slice(offset, offset + 4)); offset = offset + 4;       // 4 bytes
  var cscComErrorCount      = new Uint16Array   (buffer.slice(offset, offset + 2)); offset = offset + 2;       // 2 bytes
  var macInfo               = macInfo_t         (buffer.slice(offset, offset + macInfo_length));  offset = offset + macInfo_length;   // 5 bytes     
  var txndetails = Object.assign( 
    messageHeader,
    {"ARId"                            : arId[0] },
    {"ARSequenceNumber"                : arSequenceNumber[0]  },
    {"OperatorID"                      : operatorID[0]  },
    {"ARGenerationDateTime"            : utils.dateFormat(arGenerationDateTime[0]) },
    {"CSCRWCommunicationErrorCount"    : cscComErrorCount[0] },
    macInfo
  );
  var messageObjs = {"ARRVCTOperation" : [txndetails]};
  return messageObjs;
}
// 9 Version Information Message
// 9.1 Version Information Message Content
function txn_VersionInfo_Message(buffer) {
  var offset = 0;
  var messageHeader           =  messageHeader_t   (buffer.slice(offset, offset + header_length));    offset = offset + header_length;    // 19 bytes
  var OperatingDay            =  new Uint32Array   (buffer.slice(offset, offset + 4));                offset = offset + 4;       // 4 bytes 
  var ApplicationSWMajorVer   =  buffer.slice(offset, offset + 15);                                   offset = offset + 15;      // 15 bytes 
  var ApplicationSWMinorVer   =  buffer.slice(offset, offset + 15);                                   offset = offset + 15;      // 15 bytes 
  var CSCRW1FirmwareVersion   =  buffer.slice(offset, offset + 15);                                   offset = offset + 15;      // 15 bytes 
  var CSCRW2FirmwareVersion   =  buffer.slice(offset, offset + 15);                                   offset = offset + 15;      // 15 bytes 
  var PDFACCHVersion          =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var PDFACCSVersion          =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var AVQAVersion             =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var CSPAVersion             =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var CTPAVersion             =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var SYSDVersion             =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var CPPAVersion             =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var HTPAVersion             =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var SQLACCHVersion          =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes 
  var SQLACCSVersion          =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var FBLAVersion             =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var PBLAVersion             =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var DBLAVersion             =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var spare                   = spare_t            (buffer.slice(offset, offset + 4));                offset = offset + 4;       // SPARE 4 bytes
  var macInfo                 = macInfo_t   (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;   // 5 bytes     
  var txndetails = Object.assign( 
    messageHeader,
    {"OperatingDay"           : utils.dateFormat(OperatingDay[0] )},
    {"ApplicationSWMajorVer"  : utils.hexToAscii(arrayBufferToHex(ApplicationSWMajorVer)) },
    {"ApplicationSWMinorVer"  : utils.hexToAscii(arrayBufferToHex(ApplicationSWMinorVer)) },
    {"CSCRW1FirmwareVersion"  : utils.hexToAscii(arrayBufferToHex(CSCRW1FirmwareVersion)) },
    {"CSCRW2FirmwareVersion"  : utils.hexToAscii(arrayBufferToHex(CSCRW2FirmwareVersion)) },
    {"PDFACCHVersion"         : PDFACCHVersion[0] },
    {"PDFACCSVersion"         : PDFACCSVersion[0] },
    {"AVQAVersion"            : AVQAVersion[0] },
    {"CSPAVersion"            : CSPAVersion[0] },
    {"CTPAVersion"            : CTPAVersion[0] },
    {"SYSDVersion"            : SYSDVersion[0] },
    {"CPPAVersion"            : CPPAVersion[0] },
    {"HTPAVersion"            : HTPAVersion[0] },
    {"SQLACCHVersion"         : SQLACCHVersion[0] },
    {"SQLACCSVersion"         : SQLACCSVersion[0] },
    {"FBLAVersion"            : FBLAVersion[0] },
    {"PBLAVersion"            : PBLAVersion[0] },
    {"DBLAVersion"            : DBLAVersion[0] },
    spare,
    macInfo
  );
  var messageObjs = {"VersionInfoMessage" : [txndetails]};
  return messageObjs;
}
// 10 Event Message 
// 10.1 Event Message Content 
// 10.1.1 Stock Allocation Event 
function txn_StockAllocationEvent_t(buffer){
  var offset = 0;
  var messageHeader               = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;    // 19 bytes
  var CardIssuerID                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var CardType                    = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var MediaType                   = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var TicketStockStatus           = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes  
  var NumOfTickets                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var MovementDate                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var RequestID                   = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var StaffID                     = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var DispatchOrigin              = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var DispatchDestination         = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var SalesAgent                  = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var AuthorisedStaff             = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var StockRequestLocationNumber  = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var macInfo                     = macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length;     
  var txndetails = Object.assign( 
    messageHeader,
    {"CardIssuerID"                 : CardIssuerID[0]  },
    {"CardType"                     : CardType[0] },
    {"MediaType"                    : MediaType[0] },
    {"TicketStockStatus"            : basetypes.TicketStockStatus_t(TicketStockStatus[0]) },
    {"NumOfTickets"                 : NumOfTickets[0] },
    {"MovementDate"                 : utils.dateFormat(MovementDate[0]) },
    {"RequestID"                    : RequestID[0] },
    {"StaffID"                      : utils.hexToAscii(arrayBufferToHex(StaffID)) },
    {"DispatchOrigin"               : DispatchOrigin[0] },
    {"DispatchDestination"          : DispatchDestination[0] },
    {"SalesAgent"                   : SalesAgent[0] },
    {"AuthorisedStaff"              : utils.hexToAscii(arrayBufferToHex(AuthorisedStaff)) },
    {"StockRequestLocationNumber"   : StockRequestLocationNumber[0] },
    macInfo
  );
  var messageObjs = {"StockAllocationEvent" : [txndetails]};
  return messageObjs;
}
// 10.1.2 Stock Incoming Movement Event
function txn_StockIncomingMovementEvent_t(buffer){
  var offset = 0;
  var messageHeader               = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;    // 19 bytes
  var CardIssuerID                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var MovementDate                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var CardType                    = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var MediaType                   = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var NumOfTickets                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var AuthorisedStaff             = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var BoxNumber                   = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var DispatchOrigin              = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var DispatchDestination         = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var TicketStockStatus           = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes  
  var StaffID                     = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var StockRequestLocationNumber  = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var RequestID                   = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var macInfo                     = macInfo_t         (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;     
  var txndetails = Object.assign( 
    messageHeader,
    {"CardIssuerID"                 : CardIssuerID[0]  },
    {"MovementDate"                 : utils.dateFormat(MovementDate[0]) },
    {"CardType"                     : CardType[0] },
    {"MediaType"                    : MediaType[0] },
    {"NumOfTickets"                 : NumOfTickets[0] },
    {"AuthorisedStaff"              : utils.hexToAscii(arrayBufferToHex(AuthorisedStaff)) },
    {"BoxNumber"                    : utils.hexToAscii(arrayBufferToHex(BoxNumber)) },
    {"DispatchOrigin"               : DispatchOrigin[0] },
    {"DispatchDestination"          : DispatchDestination[0] },
    {"TicketStockStatus"            : basetypes.TicketStockStatus_t(TicketStockStatus[0]) },
    {"StaffID"                      : utils.hexToAscii(arrayBufferToHex(StaffID)) },
    {"StockRequestLocationNumber"   : StockRequestLocationNumber[0] },
    {"RequestID"                    : RequestID[0] },
    macInfo
  );
  var messageObjs = {"StockIncomingMovementEvent" : [txndetails]};
  return messageObjs;
}
// 10.1.3 Stock Outgoing Movement Event
function txn_StockOutgoingMovementEvent_t(buffer) {
  var offset = 0;
  var messageHeader               = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;    // 19 bytes
  var CardIssuerID                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var MovementDate                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var CardType                    = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var MediaType                   = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var NumOfTickets                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var AuthorisedStaff             = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var BoxNumber                   = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var DispatchOrigin              = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var DispatchDestination         = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var TicketStockStatus           = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes  
  var StaffID                     = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var StockRequestLocationNumber  = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var RequestID                   = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var macInfo                     = macInfo_t         (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;     
  var txndetails = Object.assign( 
    messageHeader,
    {"CardIssuerID"                 : CardIssuerID[0]  },
    {"MovementDate"                 : utils.dateFormat(MovementDate[0]) },
    {"CardType"                     : CardType[0] },
    {"MediaType"                    : MediaType[0] },
    {"NumOfTickets"                 : NumOfTickets[0] },
    {"AuthorisedStaff"              : utils.hexToAscii(arrayBufferToHex(AuthorisedStaff)) },
    {"BoxNumber"                    : utils.hexToAscii(arrayBufferToHex(BoxNumber)) },
    {"DispatchOrigin"               : DispatchOrigin[0] },
    {"DispatchDestination"          : DispatchDestination[0] },
    {"TicketStockStatus"            : basetypes.TicketStockStatus_t(TicketStockStatus[0]) },
    {"StaffID"                      : utils.hexToAscii(arrayBufferToHex(StaffID)) },
    {"StockRequestLocationNumber"   : StockRequestLocationNumber[0] },
    {"RequestID"                    : RequestID[0] },
    macInfo
  );
  var messageObjs = {"StockOutgoingMovementEvent" : [txndetails]};
  return messageObjs;
}
// 10.1.4 Stock Request Event 
function txn_StockRequestEvent_t(buffer){
  var offset = 0;
  var messageHeader               = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;    // 19 bytes
  var CardIssuerID                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var CardType                    = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var MediaType                   = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var TicketStockStatus           = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes  
  var NumOfTickets                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var DateRequired                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var RequestID                   = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var StaffID                     = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var DispatchDestination         = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var SalesAgent                  = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var AuthorisedStaff             = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var DispatchOrigin              = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var StockRequestLocationNumber  = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var macInfo                     = macInfo_t         (buffer.slice(offset, offset + macInfo_length));          offset = offset + macInfo_length;     
  var txndetails = Object.assign( 
    messageHeader,
    {"CardIssuerID"                 : CardIssuerID[0]  },
    {"CardType"                     : CardType[0] },
    {"MediaType"                    : MediaType[0] },
    {"TicketStockStatus"            : basetypes.TicketStockStatus_t(TicketStockStatus[0]) },
    {"NumOfTickets"                 : NumOfTickets[0] },
    {"DateRequired"                 : DateRequired[0] },
    {"RequestID"                    : RequestID[0] },
    {"StaffID"                      : utils.hexToAscii(arrayBufferToHex(StaffID)) },
    {"DispatchDestination"          : DispatchDestination[0] },
    {"SalesAgent"                   : SalesAgent[0] },
    {"AuthorisedStaff"              : utils.hexToAscii(arrayBufferToHex(AuthorisedStaff)) },
    {"DispatchOrigin"               : DispatchOrigin[0] },
    {"StockRequestLocationNumber"   : StockRequestLocationNumber[0] },
    macInfo
  );
  var messageObjs = {"StockRequestEvent" : [txndetails]};
  return messageObjs;
}
// 10.1.5 Stock Status Event 
function txn_StockStatusEvent_t(buffer){
  var offset = 0;
  var messageHeader               = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;    // 19 bytes
  var CardIssuerID                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var CardType                    = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var MediaType                   = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var TicketStockStatus           = new Uint8Array    (buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes  
  var NumOfTickets                = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var StaffID                     = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var AuthorisedStaff             = buffer.slice      (offset, offset + 10);                offset = offset + 10;      // 10 bytes
  var StockLocation               = new Uint32Array   (buffer.slice(offset, offset + 4));   offset = offset + 4;       // 4 bytes
  var macInfo                     = macInfo_t         (buffer.slice(offset, offset + macInfo_length));    offset = offset + macInfo_length;     
  var txndetails = Object.assign( 
    messageHeader,
    {"CardIssuerID"                 : CardIssuerID[0]  },
    {"CardType"                     : CardType[0] },
    {"MediaType"                    : MediaType[0] },
    {"TicketStockStatus"            : basetypes.TicketStockStatus_t(TicketStockStatus[0]) },
    {"NumOfTickets"                 : NumOfTickets[0] },
    {"StaffID"                      : utils.hexToAscii(arrayBufferToHex(StaffID)) },
    {"AuthorisedStaff"              : utils.hexToAscii(arrayBufferToHex(AuthorisedStaff)) },
    {"StockLocation"                : StockLocation[0] },
    macInfo
  );
  var messageObjs = {"StockStatusEvent" : [txndetails]};
  return messageObjs;
}
// 10.2 Device Events
// 10.2.1 Device Identification Event 
function txn_DeviceIdentificationEvent_t(buffer){
  var offset = 0;
  var messageHeader     =  messageHeader_t   (buffer.slice(offset, offset + header_length));    offset = offset + header_length;    // 19 bytes
  var StartDateTime     =  new Uint32Array   (buffer.slice(offset, offset + 4));                offset = offset + 4;       // 4 bytes
  var EndDateTime       =  new Uint32Array   (buffer.slice(offset, offset + 4));                offset = offset + 4;       // 4 bytes
  var DeviceType        =  new Uint16Array   (buffer.slice(offset, offset + 2));                offset = offset + 2;       // 2 bytes
  var DeviceStatus      =  new Uint8Array    (buffer.slice(offset, offset + 1));                offset = offset + 1;       // 1 bytes
  var BusinessFunction  =  new Uint8Array    (buffer.slice(offset, offset + 1));                offset = offset + 1;       // 1 bytes
  var AddValueCapable   =  new Uint8Array    (buffer.slice(offset, offset + 1));                offset = offset + 1;       // 1 bytes
  var OwnerID           =  new Uint32Array   (buffer.slice(offset, offset + 4));                offset = offset + 4;       // 4 bytes
  var DeviceAcquireID   =  new Uint32Array   (buffer.slice(offset, offset + 4));                offset = offset + 4;       // 4 bytes
  var macInfo           =  macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length;     
  var txndetails = Object.assign( 
    messageHeader,
    {"StartDateTime"    : utils.dateFormat(StartDateTime[0]) },
    {"EndDateTime"      : utils.dateFormat(EndDateTime[0]) },
    {"DeviceType"       : basetypes.DeviceType_t(DeviceType[0]) },
    {"DeviceStatus"     : basetypes.DeviceStatus_t(DeviceStatus[0]) },
    {"BusinessFunction" : BusinessFunction[0] },
    {"AddValueCapable"  : AddValueCapable[0] },
    {"OwnerID"          : OwnerID[0] },
    {"DeviceAcquireID"  : DeviceAcquireID[0] },
    macInfo
  );
  var messageObjs = {"DeviceIdentificationEvent " : [txndetails]};
  return messageObjs;
}
// 10.2.2 Device Status Event 
function txn_DeviceStatusEvent_t(buffer){
  var offset = 0;
  var messageHeader     =  messageHeader_t   (buffer.slice(offset, offset + header_length));    offset = offset + header_length;    // 19 bytes
  var DeviceStatus      =  new Uint8Array    (buffer.slice(offset, offset + 1));                offset = offset + 1;       // 1 bytes
  var macInfo           =  macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length;     
  var txndetails = Object.assign( 
    messageHeader,
    {"DeviceStatus"   : basetypes.DeviceStatus_t(DeviceStatus[0]) },
    macInfo
  );
  var messageObjs = {"DeviceStatusEvent " : [txndetails]};
  return messageObjs;
}
// 10.3 Hopper Events
// 10.3.1 Coin Recycle Hopper Top-Up Event
function txn_CoinRecycleHopperTopUpEvent_t(buffer) {
      var offset = 0;
      var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;
      var OperatorID                          = buffer.slice(offset, offset + 3);                   offset = offset + 3;       // 3 bytes
      var RecycleHopperID                     = new Uint8Array(buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
      var UnitOfCoin                          = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
      var QuantityOfCoin                      = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
      var TotalAmount                         = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
      var macInfo                             = macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length; 
      var txndetails = Object.assign( 
        messageHeader,
        {"OperatorID"         :   arrayBufferToHex(OperatorID) },
        {"RecycleHopperID"    :   RecycleHopperID[0] },
        {"UnitOfCoin"         :   UnitOfCoin[0] },
        {"QuantityOfCoin"     :   QuantityOfCoin[0] },
        {"TotalAmount"        :   TotalAmount[0] },
        macInfo
      );
      var messageObjs = {"CoinRecycleHopperTopUpEvent" : [txndetails]};
      return messageObjs;
}
// 10.3.2 Coin Change Hopper Top-Up Event
function txn_CoinChangeleHopperTopUpEvent_t(buffer) {
      var offset = 0;
      var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;
      var OperatorID                          = buffer.slice(offset, offset + 3);                   offset = offset + 3;       // 3 bytes
      var ChangeHopperID                      = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;       // 1 bytes
      var ChangeHopperBoxID                   = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
      var SequenceNumber                      = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
      var UnitOfCoin                          = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
      var QuantityOfCoin                      = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
      var TotalAmount                         = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
      var macInfo                             = macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length; 
      var txndetails = Object.assign( 
        messageHeader,
        {"OperatorID"         :   arrayBufferToHex(OperatorID) },
        {"ChangeHopperID"     :   ChangeHopperID[0] },
        {"ChangeHopperBoxID"  :   ChangeHopperBoxID[0] },
        {"SequenceNumber"     :   SequenceNumber[0] },
        {"UnitOfCoin"         :   UnitOfCoin[0] },
        {"QuantityOfCoin"     :   QuantityOfCoin[0] },
        {"TotalAmount"        :   TotalAmount[0] },
        macInfo
      );
      var messageObjs = {"CoinChangeleHopperTopUpEvent" : [txndetails]};
      return messageObjs;
}
// 10.3.3 Coin Change Hopper Removal Event 
function txn_CoinChangeleHopperRemovalEvent_t(buffer) {
    var offset = 0;
    var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;
    var OperatorID                          = buffer.slice(offset, offset + 3);                   offset = offset + 3;       // 3 bytes
    var ChangeHopperID                      = new Uint8Array(data.slice(offset, offset + 1));     offset = offset + 1;       // 1 bytes
    var ChangeHopperBoxID                   = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
    var SequenceNumber                      = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
    var UnitOfCoin                          = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
    var QuantityOfCoin                      = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
    var TotalAmount                         = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
    var macInfo                             = macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length; 
    var txndetails = Object.assign( 
      messageHeader,
      {"OperatorID"         :   arrayBufferToHex(OperatorID) },
      {"ChangeHopperID"     :   ChangeHopperID[0] },
      {"ChangeHopperBoxID"  :   ChangeHopperBoxID[0] },
      {"SequenceNumber"     :   SequenceNumber[0] },
      {"UnitOfCoin"         :   UnitOfCoin[0] },
      {"QuantityOfCoin"     :   QuantityOfCoin[0] },
      {"TotalAmount"        :   TotalAmount[0] },
      macInfo
    );
    var messageObjs = {"CoinChangeleHopperRemovalEvent" : [txndetails]};
    return messageObjs;
}
// 10.3.4 Token Hopper Top-Up Event
function txn_TokenHopperTopUpEvent_t(buffer) {
    var offset = 0;
    var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;
    var OperatorID                          = buffer.slice(offset, offset + 3);                   offset = offset + 3;       // 3 bytes
    var TokenHopperID                       = new Uint8Array    (buffer.slice(offset, offset + 1));  offset = offset + 1;       // 1 bytes
    var TokenBoxID                          = new Uint16Array   (buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
    var SequenceNumber                      = new Uint32Array   (buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
    var QuantityOfTokens                    = new Uint16Array   (buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
    var macInfo                             = macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length; 
    var txndetails = Object.assign( 
      messageHeader,
      {"OperatorID"                 :   arrayBufferToHex(OperatorID) },
      {"TokenHopperID"              :   TokenHopperID[0] },
      {"TokenBoxID"                 :   TokenBoxID[0] },
      {"SequenceNumber"             :   SequenceNumber[0] },
      {"QuantityOfTokens"           :   QuantityOfTokens[0] },
      macInfo
    );
    var messageObjs = {"TokenHopperTopUpEvent" : [txndetails]};
    return messageObjs;
}
// 10.3.5 Coin Recycle Hopper Clearing Event 
function txn_CoinRecycleHopperClearingEvent_t(buffer) {
  var offset = 0;
  var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;
  var OperatorID                          = buffer.slice(offset, offset + 3);                      offset = offset + 3;       // 3 bytes
  var RecycleHopperID                     = new Uint8Array    (buffer.slice(offset, offset + 1));  offset = offset + 1;       // 1 bytes
  var SequenceNumber                      = new Uint32Array   (buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var UnitOfCoin                          = new Uint16Array   (buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfCoin                      = new Uint16Array   (buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var DispensedQuantityOfCoin             = new Uint16Array   (buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var CoinDispensedTotalAmount            = new Uint32Array   (buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var macInfo                             = macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length; 
  var txndetails = Object.assign( 
    messageHeader,
    {"OperatorID"               :   arrayBufferToHex(OperatorID) },
    {"RecycleHopperID"          :   RecycleHopperID[0] },
    {"SequenceNumber"           :   SequenceNumber[0] },
    {"UnitOfCoin"               :   UnitOfCoin[0] },
    {"QuantityOfCoin"           :   QuantityOfCoin[0] },
    {"DispensedQuantityOfCoin"  :   DispensedQuantityOfCoin[0] },
    {"CoinDispensedTotalAmount" :   CoinDispensedTotalAmount[0] },
    macInfo
  );
  var messageObjs = {"CoinRecycleHopperClearingEvent" : [txndetails]};
  return messageObjs;
}
// 10.3.6 Token Hopper Clearing Event
function txn_TokenHopperClearingEvent_t(buffer) {
  var offset = 0;
  var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;
  var OperatorID                          = buffer.slice(offset, offset + 3);                   offset = offset + 3;       // 3 bytes
  var TokenHopperID                       = new Uint8Array    (buffer.slice(offset, offset + 1));  offset = offset + 1;       // 1 bytes
  var SequenceNumber                      = new Uint32Array   (buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var QuantityOfTokens                    = new Uint16Array   (buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var DispensedQuantityOfTokens           = new Uint16Array   (buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var macInfo                             = macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length; 
  var txndetails = Object.assign( 
    messageHeader,
    {"OperatorID"                 :   arrayBufferToHex(OperatorID) },
    {"TokenHopperID"              :   TokenHopperID[0] },
    {"SequenceNumber"             :   SequenceNumber[0] },
    {"QuantityOfTokens"           :   QuantityOfTokens[0] },
    {"DispensedQuantityOfTokens"  :   DispensedQuantityOfTokens[0] },
    macInfo
  );
  var messageObjs = {"TokenHopperClearingEvent" : [txndetails]};
  return messageObjs;
}
// 10.4 Token Box Events 
// 10.4.1 TIM Rejected Token Box Removal Event 
function txn_TIMRejectedTokenBoxRemovalEvent_t(buffer) {
  var offset = 0;
  var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;
  var OperatorID                          = buffer.slice(offset, offset + 3);                      offset = offset + 3;       // 3 bytes
  var SequenceNumber                      = new Uint32Array   (buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var Quantity                            = new Uint16Array   (buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var macInfo                             = macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length; 
  var txndetails = Object.assign( 
    messageHeader,
    {"OperatorID"         :   arrayBufferToHex(OperatorID) },
    {"SequenceNumber"     :   SequenceNumber[0] },
    {"Quantity"           :   Quantity[0] },
    macInfo
  );
  var messageObjs = {"TIMRejectedTokenBoxRemovalEvent" : [txndetails]};
  return messageObjs;
}
// 10.4.2 Gate Token Box Removal Event 
function txn_GateTokenBoxRemovalEvent_t(buffer) {
  var offset = 0;
  var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;
  var OperatorID                          = buffer.slice(offset, offset + 3);                   offset = offset + 3;       // 3 bytes
  var TokenHopperID                       = new Uint8Array(buffer.slice(offset, offset + 1));   offset = offset + 1;       // 1 bytes
  var TokenBoxID                          = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var SequenceNumber                      = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var InsertionTime                       = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var Quantity                            = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var macInfo                             = macInfo_t         (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length; 
  var txndetails = Object.assign( 
    messageHeader,
    {"OperatorID"         :   arrayBufferToHex(OperatorID) },
    {"TokenHopperID"      :   TokenHopperID[0] },
    {"TokenBoxID"         :   TokenBoxID[0] },
    {"SequenceNumber"     :   SequenceNumber[0] },
    {"InsertionTime"      :   utils.dateFormat(InsertionTime[0]) },
    {"Quantity"           :   Quantity[0] },
    macInfo
  );
  var messageObjs = {"GateTokenBoxRemovalEvent" : [txndetails]};
  return messageObjs;
}
// 10.5 Coin Box and Note Box Events 
// 10.5.1 TIM Coin Box Retrieval Event 
function txn_TIMCoinBoxRetrievalEvent_t(buffer) {
  var offset = 0;
  var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;
  var OperatorID                          = buffer.slice(offset, offset + 3);                   offset = offset + 3;       // 3 bytes
  var NoteBoxID                           = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var InsertionTime                       = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var RetrievalSerialNumber               = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var UnitOfNoteType1                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType2                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType3                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType4                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType5                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType6                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType7                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType8                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType1                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType2                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType3                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType4                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType5                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType6                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType7                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType8                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var TotalAmount                         = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var macInfo                             = macInfo_t      (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length; 
  var txndetails = Object.assign( 
    messageHeader,
    {"OperatorID"             :   arrayBufferToHex(OperatorID) },
    {"NoteBoxID"              :   NoteBoxID[0] }, 
    {"InsertionTime"          :   utils.dateFormat(InsertionTime[0]) },
    {"RetrievalSerialNumber"  :   RetrievalSerialNumber[0] },   
    {"UnitOfNoteType1"        :   UnitOfNoteType1[0] },
    {"UnitOfNoteType2"        :   UnitOfNoteType2[0] },
    {"UnitOfNoteType3"        :   UnitOfNoteType3[0] },
    {"UnitOfNoteType4"        :   UnitOfNoteType4[0] },
    {"UnitOfNoteType5"        :   UnitOfNoteType5[0] },
    {"UnitOfNoteType6"        :   UnitOfNoteType6[0] },
    {"UnitOfNoteType7"        :   UnitOfNoteType7[0] },
    {"UnitOfNoteType8"        :   UnitOfNoteType8[0] },
    {"QuantityOfNoteType1"    :   QuantityOfNoteType1[0] },
    {"QuantityOfNoteType2"    :   QuantityOfNoteType2[0] },
    {"QuantityOfNoteType3"    :   QuantityOfNoteType3[0] },
    {"QuantityOfNoteType4"    :   QuantityOfNoteType4[0] },
    {"QuantityOfNoteType5"    :   QuantityOfNoteType5[0] },
    {"QuantityOfNoteType6"    :   QuantityOfNoteType6[0] },
    {"QuantityOfNoteType7"    :   QuantityOfNoteType7[0] },
    {"QuantityOfNoteType8"    :   QuantityOfNoteType8[0] },
    {"TotalAmount"            :   TotalAmount[0] },
    macInfo
  );
  var messageObjs = {"TIMCoinBoxRetrievalEvent" : [txndetails]};
  return messageObjs;
}
// 10.5.2 TIM Note Box Retrieval Event 
function txn_TIMNoteBoxRetrievalEvent_t(buffer) {
  var offset = 0;
  var messageHeader                       = messageHeader_t   (buffer.slice(offset, offset + header_length));   offset = offset + header_length;
  var OperatorID                          = buffer.slice(offset, offset + 3);                   offset = offset + 3;       // 3 bytes
  var NoteBoxID                           = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var InsertionTime                       = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var RetrievalSerialNumber               = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var UnitOfNoteType1                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType2                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType3                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType4                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType5                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType6                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType7                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var UnitOfNoteType8                     = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType1                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType2                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType3                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType4                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType5                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType6                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType7                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var QuantityOfNoteType8                 = new Uint16Array(buffer.slice(offset, offset + 2));  offset = offset + 2;       // 2 bytes
  var TotalAmount                         = new Uint32Array(buffer.slice(offset, offset + 4));  offset = offset + 4;       // 4 bytes
  var macInfo                             = macInfo_t      (buffer.slice(offset, offset + macInfo_length));   offset = offset + macInfo_length; 
  var txndetails = Object.assign( 
    messageHeader,
    {"OperatorID"             :   arrayBufferToHex(OperatorID) },
    {"NoteBoxID"              :   NoteBoxID[0] }, 
    {"InsertionTime"          :   utils.dateFormat(InsertionTime[0]) },
    {"RetrievalSerialNumber"  :   RetrievalSerialNumber[0] },   
    {"UnitOfNoteType1"        :   UnitOfNoteType1[0] },
    {"UnitOfNoteType2"        :   UnitOfNoteType2[0] },
    {"UnitOfNoteType3"        :   UnitOfNoteType3[0] },
    {"UnitOfNoteType4"        :   UnitOfNoteType4[0] },
    {"UnitOfNoteType5"        :   UnitOfNoteType5[0] },
    {"UnitOfNoteType6"        :   UnitOfNoteType6[0] },
    {"UnitOfNoteType7"        :   UnitOfNoteType7[0] },
    {"UnitOfNoteType8"        :   UnitOfNoteType8[0] },
    {"QuantityOfNoteType1"    :   QuantityOfNoteType1[0] },
    {"QuantityOfNoteType2"    :   QuantityOfNoteType2[0] },
    {"QuantityOfNoteType3"    :   QuantityOfNoteType3[0] },
    {"QuantityOfNoteType4"    :   QuantityOfNoteType4[0] },
    {"QuantityOfNoteType5"    :   QuantityOfNoteType5[0] },
    {"QuantityOfNoteType6"    :   QuantityOfNoteType6[0] },
    {"QuantityOfNoteType7"    :   QuantityOfNoteType7[0] },
    {"QuantityOfNoteType8"    :   QuantityOfNoteType8[0] },
    {"TotalAmount"            :   TotalAmount[0] },
    macInfo
  );
  var messageObjs = {"TIMNoteBoxRetrievalEvent" : [txndetails]};
  return messageObjs;
}
//////////////////////////////////////////////////////////////////////////
function tdnmessage(tdType, bufferArray ) {
    //var AllHexData =  arrayBufferToHex(bufferArray);    // row Data 
    //console.log("tdnmessage : " + AllHexData);
    var outTdJson;
    switch(tdType) {
        case 1: // SVC Initialisation 
          outTdJson = txn_SVCInitialisation_t(bufferArray);
          break;
        case 2: // SVC Personalisation 
          outTdJson = txn_SVCPersonalisation_t(bufferArray);
          break;
        case 3: // Employee Card Personalisation 
          outTdJson = txn_EPCardPersonalisation_t(bufferArray);
          break;
        case 4: // Card Disposal
          outTdJson = txn_CardDisposal_t(bufferArray);
          break;
        case 6: // Cardholder Photo Details
          outTdJson = txn_CardHolderPhotoDetails_t(bufferArray);
          break;
        case 11: // SVC Issue 
          outTdJson = txn_SVCIssue_t(bufferArray);
          break;
        case 12: // CTP Issue
          outTdJson = txn_CTPIssue_t(bufferArray);
          break;
        case 13: // Personalised Card Activation 
          outTdJson = txn_PersonalisedCardActive_t(bufferArray);
        break;
        case 15: // EP Issue
          outTdJson = txn_EPIssue_t(bufferArray);
          break;
        case 21: // SVC Entry
          outTdJson = txn_SVCEntry_t(bufferArray);
          break;
        case 25: // CSC Block
          outTdJson = txn_CSCBlock_t(bufferArray);
          break;
        case 26: // CSC Rejection
          outTdJson = txn_CSCRejection_t(bufferArray);
          break;
        case 27: // CSC UnBlock
          outTdJson = txn_CSCUnBlock_t(bufferArray);
          break;
        case 29: // Card Holder Fee
          outTdJson = txn_CardHolderFee_t(bufferArray);
          break;
        case 31: // SVC Add Value
          outTdJson = txn_SVCAddValue_t(bufferArray);
          break;
        case 32: // SVC Void Usage
          outTdJson = txn_SVCVoidUsage_t(bufferArray);
          break;
        case 41: // SVC Exit
          outTdJson = txn_SVCExit_t(bufferArray);
          break;
        case 42: // CTP Exit
          outTdJson = txn_CTPExit_t(bufferArray);
          break;
        case 44: // EP Exit
          outTdJson = txn_EPExit_t(bufferArray);
          break;
        case 45: // SVC Upgrade
          outTdJson = txn_SVCUpgrade_t(bufferArray);
          break;
        case 46: // CTP Upgrade
          outTdJson = txn_CTPUpgrade_t(bufferArray);
          break;
        case 48: // SVC Exit with Promotion
          outTdJson = txn_SVCExitWithPromotion_t(bufferArray);
          break;
        case 49: // CTP Exit with Promotion
          outTdJson = txn_CTPExitWithPromotion_t(bufferArray);
          break;
        case 51: // SVC Refund
          outTdJson = txn_SVCRefund_t(bufferArray);
          break;
        case 52: // CTP Refund
          outTdJson = txn_CTPRefund_t(bufferArray);
          break;
        case 55: // SVC Replacement
          outTdJson = txn_SVCReplacement_t(bufferArray);
          break;
        case 57: // CTP Replacement
          outTdJson = txn_CTPReplacement_t(bufferArray);
          break;
        case 61: // Gift/Bonus Trip Redemption 
          outTdJson = txn_GiftBonusTripRedemption_t(bufferArray);
          break;
        case 62: // Lucky Draw Prize Redemption 
          outTdJson = txn_LuckyDrawPrizeRedemption_t(bufferArray);
          break;
        case 85: // POST Operator Shift Start
          outTdJson = txn_POSTOperatorShiftStart_t(bufferArray);
          break;
        case 86: // POST Operator Shift Start
          outTdJson = txn_POSTOperatorShiftEnd_t(bufferArray);
          break;
        case 87: // POST Operator Break Start 
          outTdJson = txn_POSTOperatorBreakStart_t(bufferArray);
          break;
        case 88: // POST Operator Break End
          outTdJson = txn_POSTOperatorBreakEnd_t(bufferArray);
          break;
        case 89: // P&R POST Operator Shift Start
          outTdJson = txn_PNRPOSTOperatorShiftStart_t(bufferArray);
          break;
        case 90: // P&R POST Operator Shift Start
          outTdJson = txn_PNRPOSTOperatorShiftEnd_t(bufferArray);
          break;
        case 91: // P&R POST Operator Break Start 
          outTdJson = txn_PNRPOSTOperatorBreakStart_t(bufferArray);
          break;
        case 92: // P&R POST Operator Break End
          outTdJson = txn_PNRPOSTOperatorBreakEnd_t(bufferArray);
          break;
        case 93: // CIPD Operator Shift Start
          outTdJson = txn_CIPDOperatorShiftStart_t(bufferArray);
          break;
        case 94: // CIPD Operator Shift End
          outTdJson = txn_CIPDOperatorShiftEnd_t(bufferArray);
          break;
        case 103: // SVC Deduct
          outTdJson = txn_SVCDeduct_t(bufferArray);
          break;
        case 104: // Card Key Update
          outTdJson = txn_CardKeyUpdate_t(bufferArray);
          break;
        case 111: // AR Gate Operation
          outTdJson = txn_AR_GateOperation_t(bufferArray);
          break;
        case 112: // AR TIM Operation
          outTdJson = txn_AR_POSTOperation_t(bufferArray);
          break;
        case 113: // AR POST Operation
          outTdJson = txn_AR_POSTOperation_t(bufferArray);
          break;
        case 114: // AR POST Operation
          outTdJson = txn_AR_PNRPOSTOperation_t(bufferArray);
          break;
        case 115: // AR CIPD Operation
          outTdJson = txn_AR_CIPDOperation_t(bufferArray);
          break;
        case 116: // AR CRD Operation
          outTdJson = txn_AR_CRDOperation_t(bufferArray);
          break;
        case 117: // AR RVCT Operation
          outTdJson = txn_AR_RVCTOperation_t(bufferArray);
          break;
        case 121: // Stock Allocation Event
          outTdJson = txn_StockAllocationEvent_t(bufferArray);
          break; 
        case 122: // Stock Incoming Movement Event Transaction
          outTdJson = txn_StockIncomingMovementEvent_t(bufferArray);
          break; 
        case 123: // Stock Outgoing Movement Event
          outTdJson = txn_StockOutgoingMovementEvent_t(bufferArray);
          break; 
        case 124: // Stock Request Event
          outTdJson = txn_StockRequestEvent_t(bufferArray);
          break;
        case 125: // Stock Status  Event
          outTdJson = txn_StockStatusEvent_t(bufferArray);
          break; 
        case 126: // Device Identification Event
          outTdJson = txn_DeviceIdentificationEvent_t(bufferArray);
          break; 
        case 127: // Device Status Event 
          outTdJson = txn_DeviceStatusEvent_t(bufferArray);
          break; 
        case 128: // Coin Recycle Hopper Top-Up Event
          outTdJson = txn_CoinRecycleHopperTopUpEvent_t(bufferArray);
          break;
        case 129: // Coin Change Hopper Top-Up Event
          outTdJson = txn_CoinChangeleHopperTopUpEvent_t(bufferArray);
          break;
        case 130: // Token Hopper Top-Up Event
          outTdJson = txn_TokenHopperTopUpEvent_t(bufferArray);
          break;
        case 131: // Coin Recycle Hopper Clearing Event
          outTdJson = txn_CoinRecycleHopperClearingEvent_t(bufferArray);
          break;
        case 132: // Token Hopper Clearing Event
          outTdJson = txn_TokenHopperClearingEvent_t(bufferArray);
          break;
        case 133: // TIM Rejected Token Box Removal Event 
          outTdJson = txn_TIMRejectedTokenBoxRemovalEvent_t(bufferArray);
          break;
        case 134: // Gate Token Box Removal Event
          outTdJson = txn_GateTokenBoxRemovalEvent_t(bufferArray);
          break;
        case 135: // TIM Coin Box Retrieval Event 
          outTdJson = txn_TIMCoinBoxRetrievalEvent_t(bufferArray);
          break;
        case 136: // TIM Note Box Retrieval Event 
          outTdJson = txn_TIMNoteBoxRetrievalEvent_t(bufferArray);
          break;
        case 137: // Coin Change Hopper Removal Event
          outTdJson = txn_CoinChangeleHopperRemovalEvent_t(bufferArray);
          break;
        case 141:
          outTdJson = txn_VersionInfo_Message(bufferArray);
          break;
        default:
          // code block
          outTdJson = {
              "txtdetails" : {
                  "type" : tdType,
                  "unsupports" : "yes"
              }
          }
          break;
    }

    return outTdJson;//
}

export {tdnmessage}; // a list of exported variables