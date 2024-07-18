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
      match.playerOne,
      match.groundType as string
    );
    const playerTwoSurfacePerformance = this.getSurfacePerformance(
      match.playerTwo,
      match.groundType as string
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
    if (!player.playerData || !player.playerData.events) {
      return 0.5; // Default to 50% if no data is available
    }

    const recentMatches = player.playerData.events; // Consider the last 5 matches
    const playerId = player.sofascoreId;

    let wins = 0;
    recentMatches.map((match) => {
      if (
        (match.winnerCode === 1 && match.homeTeam.id === playerId) ||
        (match.winnerCode === 2 && match.awayTeam.id === playerId)
      ) {
        wins++;
      }
    });

    console.log(
      `${player.name} (${player.elo}) recent form: ${wins / recentMatches.length}`
    );

    return wins / recentMatches.length;
  }

  // Helper method to get surface performance for a player
  private getSurfacePerformance(player: IPLayer, surface: string): number {
    if (!player.playerData || !player.playerData.events) {
      return 0.5; // Default to 50% if no data is available
    }

    const recentMatches = player.playerData.events.filter((m) => {
      m.groundType === surface;
    }); // Consider the last 5 matches
    const playerId = player.sofascoreId;

    if (recentMatches.length === 0) {
      return 0.5;
    }

    let wins = 0;
    recentMatches.map((match) => {
      if (
        (match.winnerCode === 1 && match.homeTeam.id === playerId) ||
        (match.winnerCode === 2 && match.awayTeam.id === playerId)
      ) {
        wins++;
      }
    });

    console.log(
      `${player.name} (${player.elo}) ${surface} performance: ${wins / recentMatches.length}`
    );

    return wins / recentMatches.length;
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
