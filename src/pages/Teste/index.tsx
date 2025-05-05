/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react";

export const Teste = () => {
  
  const reducer = (state: { count: number; showText: boolean }, action: { type: any; }) => {
    switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1, showText: !state.showText }
      case 'DECREMENT':
        return { ...state, count: state.count - 1 }
      case 'RESET':
        return { ...state, count: 0 }
      case 'TOGGLE_TEXT':
        return { ...state, showText: !state.showText }
    default:
      return state
    }
  }
  

  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true })

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">{state.count}</h1>
      <p className="text-lg text-gray-700">Esta é uma página de teste.</p>
      <button
        onClick={() => dispatch({ type: 'INCREMENT' })}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Clique aqui
      </button>

      <button
        onClick={() => dispatch({ type: 'DECREMENT' })}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Decrementar
      </button>

      <button
        onClick={() => dispatch({ type: 'RESET' })}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Resetar
      </button>

      <button
        onClick={() => dispatch({ type: 'TOGGLE_TEXT' })}
        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Alternar Texto
      </button>

      {/* <p className="text-lg text-gray-700 mt-4">{state.showText ? "Texto visível" : "Texto oculto"}</p> */}
      {state.showText && (
        <p className="text-lg text-gray-700 mt-4">Texto visível</p>
      )}
    </div>
  )
}