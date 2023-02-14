import React, { useState } from "react";
import { Die } from "./types";

interface DiceProps {
    dice: Die[]
}

interface DiceCount {
    die: Die,
    numberToRoll: number,
}

interface RollResult {
    dieName: string,
    result: string,
}

const Dice = (props: DiceProps) => {
    const [diceToRoll, setDiceToRoll] = useState<DiceCount[]>(props.dice.map(die => ({die: die, numberToRoll: 0})))
    const [rollResult, setRollResult] = useState<RollResult[]>([])

    const rollDice = () => {
        const result: RollResult[] = []
        diceToRoll.forEach(entry => {
            const faces: string[] = []
            entry.die.faces.forEach(face => {
                for (var i=0; i<face.count; i++) {
                    faces.push(face.name)
                }
            })
            for(var i=0; i<entry.numberToRoll; i++) {
                result.push(
                    {
                        dieName: entry.die.name,
                        result: faces[Math.floor(Math.random()*faces.length)]
                    }
                )
            }
        })
        setRollResult(result)
    }

    const changeDiceToRoll = (diceId: string, ammount: number) => {
        const dieIndex = diceToRoll.findIndex(entry => entry.die.id == diceId)
        const newDice = diceToRoll.map(e => e)
        newDice[dieIndex].numberToRoll += ammount
        setDiceToRoll(newDice)
    }

    const rollSummary = new Map<String, number>;
    rollResult.forEach(result => {
        if (rollSummary.has(result.result)) {
            const newValue = rollSummary.get(result.result)! + 1
            rollSummary.set(result.result, newValue)
        } else {
            rollSummary.set(result.result, 1)
        }
    })

    return(
        <div>
            <h2 className="text-xl">Dice</h2>
            <div className="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
            {diceToRoll.map(entry => {
                return (
                    <div key={entry.die.id} className="border-4 flex flex-col items-center p-1 rounded-lg border-slate-900">
                        {entry.die.name}
                        <p>{entry.numberToRoll}</p>
                        <div className="flex gap-2">
                            <button onClick={() => changeDiceToRoll(entry.die.id, -1)} className="text-3xl text-white border-2 border-red-600 rounded-md px-2 bg-red-500">-1</button>
                            <button onClick={() => changeDiceToRoll(entry.die.id, 1)} className="text-3xl text-white border-2 border-green-600 rounded-md px-2 bg-green-500">+1</button>
                        </div>
                    </div>
                )
            })}
            </div>
            <button onClick={rollDice} className=" my-2 text-white border-2 border-sky-600 rounded-md px-2 bg-sky-500">Roll!</button>
            {rollResult.length > 0 ?
                <div>
                    <ul className="mb-2 p-2 border-4 rounded-lg border-slate-900">
                    <h3>Summary</h3>
                    {Array.from(rollSummary.entries()).map((entry, i) => {
                        return (
                            <li key={i} className="even:bg-gray-200">{entry[0]}: {entry[1]}</li>
                        )
                    })}
                    </ul>
                    <ul className="p-2 border-4 rounded-lg border-slate-900">
                    <h3>All Results</h3>
                    {rollResult.map((result, i) => {
                        return (
                            <li key={i} className="even:bg-gray-200">{result.dieName}: {result.result}</li>
                        )
                    })}
                    </ul>
                </div>
            :
                <div></div>
            }
            
        </div>
    )
}

const DieComponent = (props: Die) => {
    return(
        <div>
            {props.name}
        </div>
    )
}

export default Dice
