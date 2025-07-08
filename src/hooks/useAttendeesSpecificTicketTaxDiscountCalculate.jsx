
const useAttendeesSpecificTicketTaxDiscountCalculate = ({data}) => {

    let totalWithTax;
    let payAblePrice;
    let taxDiscount;
    // Add 15% tax
    const taxRate = 0.15;
    const taxAmount = parseFloat((data?.price * taxRate).toFixed(2));
    totalWithTax = parseFloat((data?.price + taxAmount).toFixed(2));
    payAblePrice = totalWithTax;
    // Group Discount
    let discountAmount = 0;
    let totalAfterDiscount;
    if(data?.group > 1){
        discountAmount = parseFloat((totalWithTax * 0.10).toFixed(2));
        totalAfterDiscount = totalWithTax - discountAmount
        payAblePrice = totalAfterDiscount
    }

    
    taxDiscount = {price: data?.price, tax: taxAmount, groupDiscount: discountAmount, total: payAblePrice, cupon: data?.cuponCode}

    if(data.cuponCode){
       console.log('yes')
       if(data?.group === 1){
            const afterGroupDiscount = parseFloat((payAblePrice - 300).toFixed(2))
            payAblePrice = afterGroupDiscount
            taxDiscount = {price: data?.price, tax: taxAmount, groupDiscount: discountAmount, total: payAblePrice, cupon: data?.cuponCode, cuponPrice: 300}
       }
       if(data?.group > 1) {
            taxDiscount = {price: data?.price, tax: taxAmount, groupDiscount: discountAmount, total: payAblePrice, cupon: data?.cuponCode, cuponPrice: 300, cuponApplied: 'Coupon Applied with group Total'}
       }
    }
    
    return taxDiscount;
};

export default useAttendeesSpecificTicketTaxDiscountCalculate;