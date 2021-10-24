class StorePage
{
    /*get addToCart()
    {
        return $("//*[text()[contains(.,'Bacardi Breezer - Tropical')]]/..//button")
    }

    get addToCart1()
    {
        return $("//*[text()[contains(.,'Buffalo - Striploin')]]/..//button")
    }*/

    get cart()
    {
        return $("//a[text()[contains(.,'Cart')]]")
    }

    get tshirts()
    {
        return $$("div[class='card card-body']")
    }

    



    
    
}
module.exports =new StorePage
