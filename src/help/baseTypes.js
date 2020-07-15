import arrayBufferToHex from 'array-buffer-to-hex';
import * as utils from './utils.js';


//11.1.1 Boolean_t 
function Boolean_t(value) {
    var result;
    if ( value == 1)  result ="TRUE";
    else result="FALSE";
    return value+"-"+result;
}
//11.2.29 Gender_t 
function Gender_t(value) {
    var result;
    if ( value == 1)  result ="Male";
    else result="Female";
    return value+"-"+result;
}
//11.2.8 BlacklistActionCode_t 
function BlacklistActionCode_t(value) {
    var  blacklistActionCode;
    switch (value) {
        case 0 :  blacklistActionCode = "Reserved";
        break;
        case 1 :  blacklistActionCode = "Blocked";
        break;
        case 2 :  blacklistActionCode = "Add value block";
        break;
        case 3 :  blacklistActionCode = "Auto add value blocked";
        break;
        case 4 :  blacklistActionCode = "Block pending";
        break;
        case 5 :  blacklistActionCode = "Unblock";
        break;
        case 6 :  blacklistActionCode = "Block at Exit";
        break;
        case 7 :  blacklistActionCode = "Notify";
        break;
        case 8 :  blacklistActionCode = "CTP Block";
        break;
        case 9 :  blacklistActionCode = "Block at Entry";
        break;
        default : blacklistActionCode = "Unspecified";
        break
    }
    return value+"-"+blacklistActionCode;  // expected {value}-{blacklistActionCode}
}
//11.2.8 BlacklistReasonCode_t 
function BlacklistReasonCode_t(value) {
    var  blacklistReasonCode;
    switch (value) {
        case 1 :  blacklistReasonCode = "Lost";
        break;
        case 2 :  blacklistReasonCode = "Bad Debt";
        break;
        case 3 :  blacklistReasonCode = "Disable Auto Add Value";
        break;
        case 4 :  blacklistReasonCode = "Lost and Stolen";
        break;
        case 5 :  blacklistReasonCode = "Issuer Recall";
        break;
        case 6 :  blacklistReasonCode = "Refunded";
        break;
        case 7 :  blacklistReasonCode = "Security Reason";
        break;
        case 8 :  blacklistReasonCode = "Not Issued";
        break;
        case 9 :  blacklistReasonCode = "Invalid Card Serial Number";
        break;
        case 10 :  blacklistReasonCode = "Surrendered Card";
        break;
        case 11 :  blacklistReasonCode = "Blacklisted Device";
        break;
        default : blacklistReasonCode = "Unspecified";
        break
    }
    return value+"-"+blacklistReasonCode;  // expected {value}-{blacklistReasonCode}
}
//11.2.19 DegradeState_t
function DegradeState_t(value) {
    var state;
    switch (value) {
        case 0 :  state = "Normal";
        break;
        case 1 :  state = "Time Mode Override"
        break;
        case 2 :  state = "Entry/Exit Override";
        break;
        case 4 :  state = "Excess Fare Override";
        break;
        case 8 :  state = "No Travel Bypass";
        break;
        case 16 :  state = "Free Exit Bypass";
        break;
        default : state = "Unspecified";
        break;
    }
    return value+"-"+state;
}
// 11.2.20 DeviceStatus_t 
function DeviceStatus_t(value) {
    var status;
    switch (value) {
        case 0 :  status = "Reserved ";
        break;
        case 1 :  status = "InService"
        break;
        case 2 :  status = "OutOfService";
        break;
        case 3 :  status = "Registered";
        break;
        case 4 :  status = "Unregistered";
        break;
        default : status = "Unspecified";
        break;
    }
    return value+"-"+status;
}
//11.2.21 DeviceTone_t
function DeviceTone_t(value) {
    var tone;
    switch (value) {
        case 0   :  tone = "Reserved";
        break;
        case 1  :   tone = "Beep";
        break;
        case 2  :   tone = "Long Beep";
        break;
        case 3  :   tone = "Longer Beep";
        break;
        default :   tone = "Unspecified";
        break;
    };
    return value+"-"+tone;
}
//11.2.22 DeviceType_t 
function DeviceType_t(value) {
    var dvType;
    switch (value) {
        case 0 :  dvType = "Reserved";
        break;
        case 1 :  dvType = "SCS"
        break;
        case 2 :  dvType = "P&R CS";
        break;
        case 3 :  dvType = "TIM";
        break;
        case 4 :  dvType = "POST";
        break;
        case 5 :  dvType = "P&R POST";
        break;
        case 6 :  dvType = "AG"
        break;
        case 7 :  dvType = "CRD";
        break;
        case 8 :  dvType = "RVCT";
        break;
        case 9 :  dvType = "DMCS";
        break;
        case 250 :  dvType = "CIPD";
        break;
        default : dvType = "Unspcified";
        break;e
    }
    return value+"-"+dvType;
}
// 11.2.23 DisplayLight_t
function  DisplayLight_t(value) {
    var light;
    switch (value) {
        case 0   :  light = "Reserved";
        break;
        case 1  :   light = "Green";
        break;
        case 2  :   light = "Red";
        break;
        case 3  :   light = "Amber";
        break;
        default :   light = "Unspecified";
        break;
    };
    return value+"-"+light;
}
//11.2.30 HopperType_t
function HopperType_t(value) {
    var type;
    switch (value) {
        case 0   :  type = "Reserved";
        break;
        case 1  :   type = "Token";
        break;
        case 2  :   type = "Coin";
        break;
        default :   type = "Unspecified";
        break;
    }
    return value+"-"+type;
}
//11.2.33 Language_t
function Language_t(value) {
    var type;
    switch (value) {
        case 0   :  type = "Thai";
        break;
        case 1  :   type = "English";
        break;
        case 2  :   type = "Chinese";
        break;
        default :   type = "Unspecified";
        break;
    }
    return value+"-"+type;
}
//11.2.39 PassValidityDurationMode_t
function PassValidityDurationMode_t(value) {
    var mode;
    switch (value) {
        case 0   :  mode = "No validity checking";
        break;
        case 1  :   mode = "Number of days since date of issue";
        break;
        case 2  :   mode = "Number of days since date of first usage";
        break;
        case 3  :   mode = "Fixed date";
        break;
        default :   mode = "Unspecified";
        break;
    }
    return value+"-"+mode;
}
//11.2.50 RedemptionMode_t
function RedemptionMode_t(value) {
    var mode;
    switch (value) {
        case 0   :  mode = "Gift";
        break;
        case 1  :   mode = "Bonus Trips";
        break;
        case 2  :   mode = "Bonus Value";
        break;
        default :   mode = "Unspecified";
        break;
    }
    return value+"-"+mode;
}
//11.2.52 RefundReason_t 
function RefundReason_t(value) {
    var reason;
    switch (value) {
        case 0   :  reason = "Readable CSC";
        break;
        case 1  :   reason = "Damaged but readable CSC";
        break;
        case 2  :   reason = "Corrupted CSC";
        break;
        case 3  :   reason = "Deferred Refund CSC";
        break;
        default :   reason = "Unspecified";
        break;
    }
    return value+"-"+reason;
}
//11.2.53 RejectCode_t 
function RejectCode_t(value) {
    var code;
    switch (value) {
        case 0   :  code = "Nothing";
        break;
        case 31  :  code = "Value is insufficient";
        break;
        case 35  :  code = "Card is in blacklist";
        break;
        case 107 :  code = "CSC blocking flag is set";
        break;
        case 109 :  code = "No entry is found";
        break;
        case 110 :  code = "Exit is not done";
        break;
        case 137 :  code = "Card type is invalid";
        break;
        case 142 :  code = "Ticket type is invalid";
        break;
        case 156 :  code = "Card status is invalid";
        break;
        case 159 :  code = "Excess trip time";
        break;
        case 163 :  code = "Card has been expired";
        break;
        case 172 :  code = "Test flag is not valid for the transaction";
        break;
        case 173 :  code = "Project ID is invalid ";
        break;
        case 174 :  code = "Issue ID is invalid";
        break;
        case 175 :  code = "Purse Value is invalid";
        break;
        case 176 :  code = "Pass in not allowed for issuance";
        break;
        case 177 :  code = "Card is personalised ";
        break;
        case 178 :  code = "Insufficient bonus points";
        break;
        case 179 :  code = "No valid STP presents";
        break;
        case 180 :  code = "EP refreshment is not allowed";
        break;
        case 181 :  code = "Maximum lifecycle counter";
        break;
        default : code = "Unspecified";
        break;
    }
    return value+"-"+code;
}
//11.2.54 RestrictedforSale_t
function RestrictedforSale_t(value) {
    var result;
    if ( value == 1)  result ="Yes";
    else result="No";
    return value+"-"+result;
}
//11.2.57 SurrenderReason_t
function SurrenderReason_t(value) {
    var  surrenderReason;
    switch (value) {
        case 0 :  surrenderReason = "On request from the cardholder"
        break;
        case 1 :  surrenderReason = "Card damaged but readable";
        break;
        case 2 :  surrenderReason = "The card has faulty";
        break;
        case 3 :  surrenderReason = "The card has expired";
        break;
        case 4 :  surrenderReason = "The card was blocked";
        break;
        case 5 :  surrenderReason = "The card isn’t printable";
        break;
        case 6 :  surrenderReason = "The card expired automatically";
        break;
        case 7 :  surrenderReason = "A product on the card has expired automatically";
        break;
        case 8 :  surrenderReason = "A ticket exchange occurred";
        break;
        case 9 :  surrenderReason = "The card failed to be initialised";
        break;
        default : surrenderReason = "Unspecified";
        break
    }
    return value+"-"+surrenderReason;  // expected {value}-{surrenderReason}
}
//11.2.55 ServiceProvider_t
function ServiceProvider_t(value) {
    var  serviceProvider;
    switch (value) {
        case 0 :  serviceProvider = "Unknown"
        break;
        case 2 :  serviceProvider = "BEM Blue Line";
        break;
        case 10 :  serviceProvider = "MRTA Purple Line (North)";
        break;
        case 11 :  serviceProvider = "MRTA Purple Line (South)";
        break;
        case 20 :  serviceProvider = "Blue Line Extension";
        break;
        case 21 :  serviceProvider = "BTE";
        break;
        case 51 :  serviceProvider = "P&R Blue Line";
        break;
        case 52 :  serviceProvider = "P&R Purple Line";
        break;
        case 99 :  serviceProvider = "MRTA Issuer";
        break;
        default : serviceProvider = "Unspecified";
        break
    }
    return value+"-"+serviceProvider;  // expected {value}-{serviceProvider}
}
//11.2.58 TestFlag_t
function TestFlag_t(value) {
    var result;
    if ( value == 1)  result ="Test Card";
    else result="Not test card";
    return value+"-"+result;
}
//11.2.59 TicketStockStatus_t
function TicketStockStatus_t(value) {
    var status;
    switch (value) {
        case 0 :    status = "Reserved";
        break;
        case 1 :    status = "Normal";
        break;
        case 2 :    status = "A batch withdrawal";
        break;
        case 3 :    status = "Damaged tickets";
        break;
        case 4 :    status = "Ticket has reached its maximum lifecycle count";
        break;
        case 5 :    status = "Ticket is faulty";
        break;
        default :   status = "Unspecified";
        break;
    }
    return value+"-"+status;  // expected {value}-{status}
}
//11.2.60 Title_t
function Title_t(value) {
    var title;
    switch(value) {
        case 0 :    title = "Reserved";
        break;
        case 1 :    title = "Mr.";
        break;
        case 2 :    title = "Mrs.";
        break;
        case 3 :    title = "Miss.";
        break;
        case 4 :    title = "Dr.";
        break;
        default :   title = "Unspecified";
        break;
    }
    return value+"-"+title;  // expected {value}-{title}
}
//11.2.61 TokenBoxID_t 
function TokenBoxID_t(value) {
    var result;
    if ( value == 1)  result ="Coin";
    else result="Token";
    return value+"-"+result;
}
// 11.2.67 UpgradeReason_t
function UpgradeReason_t(value) {
    var upgradeReason;
    switch (value) {
        case 0 : upgradeReason = "Reserved";
        break;
        case 1 : upgradeReason = "Entry Mismatch";
        break; 
        case 2 : upgradeReason = "Exit Mismatch";
        break;
        case 3 : upgradeReason = "Excess Time in System";
        break;
        case 4 : upgradeReason = "Over Travel";
        break;
        case 5 : upgradeReason = "Lost Card at P&R";
        break;
        case 6 : upgradeReason = "Overnight Parking";
        break;
        case 7 : upgradeReason = "Damaged/Unreadable Card";
        break;
        default :  upgradeReason = "Unspecified";
        break;
    }
    return value+"-"+upgradeReason;  // expected {value}-{blacklistReasonCode}
}
// 11.2.68 UseBestFare_t
function UseBestFare_t(value){
    var result;
    if ( value == 1)  result ="Use hierarchical product";
    else result="Use Best Fare";
    return value+"-"+result;
}
// 11.2.69 ValidityMode_t
function ValidityMode_t(value){
    var mode;
    switch (value){
        case 0 : mode = "No check";
        break;
        case 1 : mode = "Check at specified days since issue";
        break;
        case 2 : mode = "Check at specified days since first use";
        break;
        case 3 : mode = "Check at fixed Date";
        break;
        default :  mode = "Unspecified";
        break;
    }
    return value+"-"+mode;  // expected {value}-{blacklistReasonCode}
}
// 11.2.72 ValueOneUnitUnsigned_t
function ValueOneUnitUnsigned_t(value) {
    var hexValue = utils.changeEndianness(arrayBufferToHex(value)); // convert to little edian
    return parseInt(hexValue, 16);
}
// 11.2.73 AdjustmentPayment_t
function AdjustmentPayment_t(value){
    var result;
    if ( value == 1)  result ="Paid by Purse ";
    else result="Not Paid by Purse ";
    return value+"-"+result;
}
export {
        Boolean_t,                  //11.1.1 Boolean_t 
        BlacklistActionCode_t,      //11.2.7 BlacklistActionCode_t
        DegradeState_t,             //11.2.19 DegradeState_t
        Gender_t,                   //11.2.29 Gender_t
        DeviceStatus_t,             //11.2.20 DeviceStatus_t
        DeviceTone_t,               //11.2.21 DeviceTone_t
        DeviceType_t,               //11.2.22 DeviceType_t
        DisplayLight_t,             //11.2.23 DisplayLight_t 
        HopperType_t,               //11.2.30 HopperType_t
        //11.2.32 IssuerID_t 
        Language_t,                 //11.2.33 Language_t
        PassValidityDurationMode_t, //11.2.39 PassValidityDurationMode_t
        RedemptionMode_t,           //11.2.50 RedemptionMode_t
        RefundReason_t,             //11.2.52 RefundReason_t
        RejectCode_t,               //11.2.53 RejectCode_t 
        RestrictedforSale_t,        //11.2.54 RestrictedforSale_t
        ServiceProvider_t,          //11.2.55 ServiceProvider_t
        SurrenderReason_t,          //11.2.57 SurrenderReason_t 
        TestFlag_t,                 //11.2.58 TestFlag_t
        TicketStockStatus_t,        //11.2.59 TicketStockStatus_t
        Title_t,                    //11.2.60 Title_t
        TokenBoxID_t,               //11.2.61 TokenBoxID_t  
        UpgradeReason_t,            //11.2.67 UpgradeReason_t
        UseBestFare_t,              //11.2.68 UseBestFare_t 
        ValidityMode_t,             //11.2.69 ValidityMode_t
        ValueOneUnitUnsigned_t,     //11.2.72 ValueOneUnitUnsigned_t 
        AdjustmentPayment_t,        //11.2.73 AdjustmentPayment_t 
        BlacklistReasonCode_t,      //11.2.8 BlacklistReasonCode_t
    }; // a list of exported variables