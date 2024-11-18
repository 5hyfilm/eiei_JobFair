 
import CompanyCatalogue from "@/components/CompanyCatalog";
import { render,screen,waitFor } from "@testing-library/react";
// import { describe } from "node:test";
 

const mockResult ={
    success: true,
    count: 3,
    pagination: {},
    data: [
      {
        _id: '67010c9c56de28f78da5f15d',
        name: 'ASD Coporation',
        business: 'string',
        address: 'eiei',
        province: 'string',
        postalcode: '10214',
        tel: '0000000000',
        picture: 'https://drive.google.com/uc?id=1glL1Rm\ndkdVSUDOmqxQvz6L3_5f2bgPpj',
        __v: 0,
        id: '67010c9c56de28f78da5f15d'
      },
      {
        _id: '672f5b9cbad4f086c6fa597b',
        name: 'ABC Coporations',
        business: 'Business',
        address: 'Building3',
        province: 'Bangkok',
        postalcode: '10210',
        tel: '0971751495',
        picture: 'https://drive.google.com/uc?id=18I2Hm834RxWFvqnJfYNT5Bm4hx0GqsAO',
        __v: 0,
        id: '672f5b9cbad4f086c6fa597b'
      },
      {
        _id: '673702ceb4d3bd4906a9a372',
        name: 'LOPOLLDSA',
        business: 'Business',
        address: 'sadssadasd',
        province: 'JKOOSDA',
        postalcode: '10210',
        tel: '0952142546',
        picture: ' https://drive.google.com/uc?id=18I2Hm834RxWFvqnJfYNT5Bm4hx0GqsAO',
        __v: 0,
        id: '673702ceb4d3bd4906a9a372'
      }
    ]
  }


describe('CompanyCatalogue', () => {
    it('should have correct number of Company images',async()=>{
        const companyCatalog=await CompanyCatalogue({companiesJson:mockResult})
        render(companyCatalog)
        await waitFor(
            ()=>{
                const carImages=screen.queryAllByRole('img')
                expect(carImages.length).toBe(3)
            }
        )
    })
})