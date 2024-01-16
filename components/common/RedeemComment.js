import React from 'react';

function RedeemComment({
    productName, 
    showRedeem, 
    product_redeem_price, 
    product_redeem_discount_rate_toFixed, 
    redeemProductIds, 
    isProductIdInRedeem
}) {
    console.log('Redeem Comment',
    {
        productName: productName,
        showRedeem: showRedeem ? "True" : "False",
        ProductRedeemPrice: product_redeem_price || "N/A",
        RedeemDiscountRate: product_redeem_discount_rate_toFixed || "N/A",
        RedeemProductIds: redeemProductIds,
        IsProductIdInRedeem: isProductIdInRedeem,
    });

    return (
        <div>
        </div>
    );
}

export default RedeemComment;
