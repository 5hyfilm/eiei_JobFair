interface CompanyItem {
    data: any; // Need fix
    _id: string,
    name: string,
    business: string,
    address: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    __v: number,
    id: string
  }

  interface CompanyEditFormProps {
    initialData: {
        id: any;
        name: string;
        business: string;
        address: string;
        province: string;
        postalcode: string;
        tel: string;
        picture: string;
    };
    token: string;
    cid: string;
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
    company:string
  }

  interface BookingJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: BookingItem[]
  }
