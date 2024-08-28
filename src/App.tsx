import './App.css'
import CustomScrollbarSetting from './components/CustomScrollbarSetting'
import ShowScrollbar from './components/ShowScrollbar'

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold flex flex-row justify-center items-center">
        ScrollBar Generator
        <div className="version-tag">
          v0.0.1
        </div>
      </h1>
      <main className="grid grid-cols-2 gap-x-24 w-[120vh]">
        <section>
          <CustomScrollbarSetting />
        </section>
        <section>
          <ShowScrollbar />
        </section>
      </main>
    </>
  )
}

export default App
