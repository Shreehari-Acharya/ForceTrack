import loadingUrl from '@/assets/loading.svg'

export default function Loader({message}) {
  return (
    <div className='flex flex-col items-center justify-center space-y-4 p-8'>
            <img src={loadingUrl} alt="" className='w-20 h-20' />
            <p className='text-foreground/40 text-2xl mt-2'>{message || "Loading..."}</p>
    </div>

  )
}
