import React from "react";
import "./Home.css"
// servicePrice is a prop passed down 

export const HomePageCard = ( {servicePrice} ) => {



   


        return(
            <>
            <div className="servicePriceCard">
                
                    <h4>Type: {servicePrice.type}</h4>
                    <h4>Price: ${servicePrice.price}</h4>
            </div>
          
            </>
        )
}