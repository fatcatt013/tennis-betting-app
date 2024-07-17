import { Injectable } from '@angular/core';
import { IMatch, IPLayer } from '../redux/interfaces/matches.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TennisProbabilityCalculatorService {
  constructor() {}

  // Method to calculate probabilities for a match
  calculateProbabilities(match: IMatch): { [key: string]: number } {
    const playerOneElo = match.playerOne.elo as number;
    const playerTwoElo = match.playerTwo.elo as number;
    const playerOneRecentForm = this.getRecentForm(match.playerOne);
    const playerTwoRecentForm = this.getRecentForm(match.playerTwo);
    const playerOneSurfacePerformance = this.getSurfacePerformance(
      match.playerOne
    );
    const playerTwoSurfacePerformance = this.getSurfacePerformance(
      match.playerTwo
    );

    const baseProbabilities = this.calculateBaseProbabilities(
      playerOneElo,
      playerTwoElo
    );
    const adjustedProbabilities = this.adjustProbabilities(
      baseProbabilities,
      playerOneRecentForm,
      playerTwoRecentForm,
      playerOneSurfacePerformance,
      playerTwoSurfacePerformance
    );

    return {
      Player1_Wins_Match: adjustedProbabilities.playerOneMatchWin,
      Player2_Wins_Match: adjustedProbabilities.playerTwoMatchWin,
      Player1_Wins_First_Set: adjustedProbabilities.playerOneFirstSetWin,
      Player2_Wins_First_Set: adjustedProbabilities.playerTwoFirstSetWin,
      // Add other probabilities as needed
    };
  }

  // Helper method to get recent form for a player
  private getRecentForm(player: IPLayer): number {
    // Implement logic to evaluate the recent form of the player
    return 0.6; // Example recent form win rate (60%)
  }

  // Helper method to get surface performance for a player
  private getSurfacePerformance(player: IPLayer): number {
    // Implement logic to evaluate the player's performance on the specific surface
    return 0.55; // Example surface performance win rate (55%)
  }

  // Method to calculate base probabilities using ELO ratings
  private calculateBaseProbabilities(
    playerOneElo: number,
    playerTwoElo: number
  ): { playerOneWin: number; playerTwoWin: number } {
    const eloDifference = playerOneElo - playerTwoElo;
    const playerOneWinProbability =
      1 / (1 + Math.pow(10, -eloDifference / 400));
    const playerTwoWinProbability = 1 - playerOneWinProbability;
    return {
      playerOneWin: playerOneWinProbability,
      playerTwoWin: playerTwoWinProbability,
    };
  }

  // Method to adjust base probabilities based on recent form and surface performance
  private adjustProbabilities(
    baseProbabilities: { playerOneWin: number; playerTwoWin: number },
    playerOneRecentForm: number,
    playerTwoRecentForm: number,
    playerOneSurfacePerformance: number,
    playerTwoSurfacePerformance: number
  ): {
    playerOneMatchWin: number;
    playerTwoMatchWin: number;
    playerOneFirstSetWin: number;
    playerTwoFirstSetWin: number;
  } {
    const playerOneMatchWin =
      baseProbabilities.playerOneWin *
      playerOneRecentForm *
      playerOneSurfacePerformance;
    const playerTwoMatchWin =
      baseProbabilities.playerTwoWin *
      playerTwoRecentForm *
      playerTwoSurfacePerformance;
    const normalizationFactor = playerOneMatchWin + playerTwoMatchWin;
    return {
      playerOneMatchWin: playerOneMatchWin / normalizationFactor,
      playerTwoMatchWin: playerTwoMatchWin / normalizationFactor,
      playerOneFirstSetWin:
        baseProbabilities.playerOneWin * playerOneRecentForm, // Simplified example for set win
      playerTwoFirstSetWin:
        baseProbabilities.playerTwoWin * playerTwoRecentForm, // Simplified example for set win
    };
  }
}
