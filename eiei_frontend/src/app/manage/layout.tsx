export default function ManageLayout(
    {children}:
    {children:React.ReactNode}){
    
        return(
        <div className="flex flex-col w-full p-10 my-2">
            {children}            
        </div>
    );
}
