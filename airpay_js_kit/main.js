function getParamsString(){

	var buyerEmail = $('[name="buyerEmail"]').val(),
		buyerPhone = $('[name="buyerPhone"]').val(),
		buyerFirstName = $('[name="buyerFirstName"]').val(),
		buyerLastName = $('[name="buyerLastName"]').val(),
		buyerAddress = $('[name="buyerAddress"]').val(),
		buyerCity = $('[name="buyerCity"]').val(),
		buyerState = $('[name="buyerState"]').val(),
		buyerCountry = $('[name="buyerCountry"]').val(),
		buyerPinCode = $('[name="buyerPinCode"]').val(),
		orderid = $('[name="orderid"]').val(),
		amount = $('[name="amount"]').val(),
		customvar = $('[name="customvar"]').val(),
		txnsubtype = $('[name="txnsubtype"]').val(),
		token = $('[name="token"]').val(),
		wallet = $('[name="wallet"]').val(),
		currency = $('[name="currency"]').val(),
		isocurrency = $('[name="isocurrency"]').val(),
		stringParam = '';
		
	stringParam += buyerEmail + buyerFirstName + buyerLastName + buyerAddress + buyerCity + buyerState + buyerCountry + amount + orderid;  
	return stringParam;
}

function redirectPaymentUrl(){
	var paramString = getParamsString(),
		date = new Date(),
		alldata = '',
		privateKey = getPrivateKey(),
		checksum;
	var customvar = $('[name="customvar"]').val()+'|'+merchantDetails.username+'|'+merchantDetails.mercid;
	console.log(customvar);
		alldata += paramString + date.toISOString().split('T')[0]+"";
		checksum = getCheckSum(alldata);
		if($('[name="privatekey"]').val()){
			$('[name="checksum"]').val() = "";
			$('[name="privatekey"]').val() = "";
			$('[name="mercid"]').val() = "";
			$('[name="chmod"]').val() = "";
		}

	var paramsHtml = '<input type="hidden" name="privatekey" id="privatekey" value="'+privateKey+'"><input type="hidden" name="checksum" id="checksum" value="'+checksum+'"><input type="hidden" name="mercid" id="mercid" value="'+merchantDetails.mercid+'"><input type="hidden" name="chmod" id="chmod" value="'+chmod+'"><input type="hidden" name="customvar" id="customvar" value="'+customvar+'">';
	$('.main-transaction-form').append(paramsHtml);
}

function getPrivateKey(){
	var sha256Param = merchantDetails.secret + '@' + merchantDetails.username + ':|:' + merchantDetails.password ;

	return $.sha256(sha256Param);
}

function getCheckSum(alldata){
	key = $.sha256(merchantDetails.username+"~:~"+merchantDetails.password); 
	return $.sha256(key+"@"+alldata);
}
	