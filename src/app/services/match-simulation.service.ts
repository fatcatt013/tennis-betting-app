import { Injectable } from '@angular/core';

type MatchResult = {
  p1WinProbability: number;
  p2WinProbability: number;
};

@Injectable({
  providedIn: 'root',
})
export class MatchSimulator {
  getServeProbability(playerServePointsWon: number[]): number {
    const totalPoints = playerServePointsWon.reduce(
      (sum, points) => sum + points,
      0
    );
    return totalPoints / playerServePointsWon.length;
  }

  simulateMatch(
    p1Serve: number,
    p2Serve: number,
    numSimulations: number
  ): MatchResult {
    function simulatePoint(prob: number): boolean {
      return Math.random() < prob;
    }

    function simulateGame(pServe: number): number {
      let p1Points = 0;
      let p2Points = 0;

      while (true) {
        if (simulatePoint(pServe)) {
          p1Points++;
        } else {
          p2Points++;
        }

        if (p1Points >= 4 && p1Points - p2Points >= 2) {
          return 1;
        } else if (p2Points >= 4 && p2Points - p1Points >= 2) {
          return 2;
        }
      }
    }

    function simulateSet(p1Serve: number, p2Serve: number): number {
      let p1Games = 0;
      let p2Games = 0;
      let currentServe = 1;

      while (p1Games < 6 && p2Games < 6) {
        if (currentServe === 1) {
          if (simulateGame(p1Serve) === 1) {
            p1Games++;
          } else {
            p2Games++;
          }
          currentServe = 2;
        } else {
          if (simulateGame(p2Serve) === 1) {
            p1Games++;
          } else {
            p2Games++;
          }
          currentServe = 1;
        }

        // Check for tie-break situation
        if (p1Games === 6 && p2Games === 6) {
          return simulateTieBreak(p1Serve, p2Serve);
        }
      }

      return p1Games > p2Games ? 1 : 2;
    }

    function simulateTieBreak(p1Serve: number, p2Serve: number): number {
      let p1Points = 0;
      let p2Points = 0;

      while (true) {
        if (simulatePoint(p1Serve)) {
          p1Points++;
        } else {
          p2Points++;
        }

        if (simulatePoint(p2Serve)) {
          p1Points++;
        } else {
          p2Points++;
        }

        if (p1Points >= 7 && p1Points - p2Points >= 2) {
          return 1;
        } else if (p2Points >= 7 && p2Points - p1Points >= 2) {
          return 2;
        }
      }
    }

    function simulateBestOfFiveMatch(p1Serve: number, p2Serve: number): number {
      let p1Sets = 0;
      let p2Sets = 0;

      while (p1Sets < 3 && p2Sets < 3) {
        if (simulateSet(p1Serve, p2Serve) === 1) {
          p1Sets++;
        } else {
          p2Sets++;
        }
      }

      return p1Sets > p2Sets ? 1 : 2;
    }

    let p1Wins = 0;
    let p2Wins = 0;

    for (let i = 0; i < numSimulations; i++) {
      if (simulateBestOfFiveMatch(p1Serve, p2Serve) === 1) {
        p1Wins++;
      } else {
        p2Wins++;
      }
    }

    return {
      p1WinProbability: (p1Wins / numSimulations) * 100,
      p2WinProbability: (p2Wins / numSimulations) * 100,
    };
  }
}
