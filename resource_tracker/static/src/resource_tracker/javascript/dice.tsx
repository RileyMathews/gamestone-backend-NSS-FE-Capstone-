import React, { useState } from "react";
import { Die } from "./types";

interface DiceProps {
    dice: Die[];
}

interface RollResult {
    dieName: string;
    result: string;
}

const Dice = (props: DiceProps) => {
    const [rollResults, setRollResults] = useState<RollResult[]>([]);

    const addDiceToResults = (results: RollResult[]) => {
        setRollResults([...results, ...rollResults]);
    };

    const roll = (diceId: string, numberToRoll: number) => {
        const die = props.dice.find((dice) => dice.id === diceId)!;
        const faces: string[] = [];
        die.faces.forEach((face) => {
            for (var i = 0; i < face.count; i++) {
                faces.push(face.name);
            }
        });
        const results: RollResult[] = [];
        for (var i = 0; i < numberToRoll; i++) {
            results.push({
                dieName: die.name,
                result: faces[Math.floor(Math.random() * faces.length)],
            });
        }
        addDiceToResults(results);
    };

    const resetRolls = () => {
        setRollResults([])
    }

    const rollSummary = new Map<String, number>();
    rollResults.forEach((result) => {
        if (rollSummary.has(result.result)) {
            const newValue = rollSummary.get(result.result)! + 1;
            rollSummary.set(result.result, newValue);
        } else {
            rollSummary.set(result.result, 1);
        }
    });
    const totalRolled = new Map<String, number>();
    rollResults.forEach((result) => {
        if (totalRolled.has(result.dieName)) {
            const newValue = totalRolled.get(result.dieName)! + 1;
            totalRolled.set(result.dieName, newValue);
        } else {
            totalRolled.set(result.dieName, 1);
        }
    });

    return (
        <div>
            <h2 className="text-xl">Dice</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {props.dice.map((die) => {
                    return (
                        <div key={die.id} className="border-4 rounded-lg border-slate-900 flex flex-col items-center">
                            <span>{die.name}</span>
                            <div key={die.id} className="flex flex-wrap items-center justify-between gap-2 p-1">
                                {Array(9)
                                    .fill(undefined)
                                    .map((item, i) => (
                                        <button key={i} onClick={() => roll(die.id, i + 1)} className="text-white border-2 border-green-600 rounded-md px-2 bg-green-500">
                                            {i + 1}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            {rollResults.length > 0 ? (
                <div>
                    <h3 className="text-lg">Rolls</h3>
                    <button onClick={resetRolls} className="mb-2 text-white border-2 border-red-600 rounded-md px-2 bg-red-500">Clear Rolls</button>
                    <div className="grid grid-cols-2 gap-2">
                        <ul className="mb-2 p-2 border-4 rounded-lg border-slate-900">
                            <h4>Roll Results</h4>
                            {Array.from(rollSummary.entries()).map((entry, i) => {
                                return (
                                    <li key={i} className="even:bg-gray-200">
                                        {entry[0]}: {entry[1]}
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className="mb-2 p-2 border-4 rounded-lg border-slate-900">
                            <h4>Dice Rolled</h4>
                            {Array.from(totalRolled.entries()).map((entry, i) => {
                                return (
                                    <li key={i} className="even:bg-gray-200">
                                        {entry[0]}: {entry[1]}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <ul className="p-2 border-4 rounded-lg border-slate-900">
                        <h3>All Results</h3>
                        {rollResults.map((result, i) => {
                            return (
                                <li key={i} className="even:bg-gray-200">
                                    {result.dieName}: {result.result}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Dice;
