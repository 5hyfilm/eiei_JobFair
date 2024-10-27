interface CompanyItem {
    _id: string,
    name: string,
    bussiness: string,
    address: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    __v: number,
    id: string
  }
  
  interface CompanyJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CompanyItem[]
  }

  interface BookingItem {
    _id: string,
    bookingDate:string,
    user:string,
    id: string,
    company:CompanyItem
  }

  interface BookingJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: BookingItem[]
  }