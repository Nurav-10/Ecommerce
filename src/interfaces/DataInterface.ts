export interface Data{
   id:number,
   title:string,
   brand:string,
   price:number,
   description:string,
   tags:[string],
   stock:number,
   thumbnail:string,
   category:string,
   availabilityStatus:string,
   discount:number,
   shippingInformation:string,
   images:[
      string
   ]
}

export type ImageSliderProps={
   sliderItem:Data;
}