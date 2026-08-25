
import { InfinitySpin } from "react-loader-spinner";
 const Loader=({text})=>{

    return (

        <div className="flex justify-center items-center w-full h-112.5">
            <div className="flex flex-col items-center gap-1">
                 <InfinitySpin
                         width="200"
                         color="#4fa94d"
                            />

                <p className="text-slate-800">{text?text:"Please wait..."}</p>
            </div>
        </div>
        

    );
};

export default Loader;