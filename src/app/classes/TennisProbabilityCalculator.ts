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

    const playerOneFirstSetPerformance = this.getFirstSetPerformance(
      match.playerOne
    );
    const playerTwoFirstSetPerformance = this.getFirstSetPerformance(
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
      playerTwoSurfacePerformance,
      playerOneFirstSetPerformance,
      playerTwoFirstSetPerformance
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

    const recentMatches = player.playerData.events;
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
      '==============================================================='
    );

    console.log(
      `${player.name} (${player.elo}) wins ${wins}/${recentMatches.length}`
    );

    console.log(
      `${player.name} (${player.elo}) recent form: ${((wins / recentMatches.length) * 100).toFixed(2)}%`
    );

    return wins / recentMatches.length;
  }

  // Helper method to get surface performance for a player
  private getSurfacePerformance(player: IPLayer, surface: string): number {
    if (!player.playerData || !player.playerData.events) {
      console.log('No data for surface performance');
      return 0.5; // Default to 50% if no data is available
    }

    const recentMatches = player.playerData.events.filter(
      (m) => m.groundType === surface
    ); // Consider the last 5 matches
    const playerId = player.sofascoreId;

    if (recentMatches.length === 0) {
      console.log(`No matches for surface performance (${surface})`);
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
      '==============================================================='
    );

    console.log(
      `${player.name} (${player.elo}) ${surface} wins ${wins}/${recentMatches.length}`
    );

    console.log(
      `${player.name} (${player.elo}) ${surface} performance: ${((wins / recentMatches.length) * 100).toFixed(2)}%`
    );

    return wins / recentMatches.length;
  }

  // Helper method to get first set performance for a player
  private getFirstSetPerformance(player: IPLayer): number {
    if (!player.playerData || !player.playerData.events) {
      return 0.5; // Default to 50% if no data is available
    }

    const recentMatches = player.playerData.events; // Consider the last 5 matches
    const playerId = player.sofascoreId;

    let firstSetWins = 0;
    let totalMatchesWithFirstSet = 0;

    recentMatches.forEach((match) => {
      // Extract the first set scores from homeScore and awayScore
      const homeFirstSetScore = match.homeScore?.period1; // Adjust the property name as per your data structure
      const awayFirstSetScore = match.awayScore?.period1; // Adjust the property name as per your data structure

      if (homeFirstSetScore !== undefined && awayFirstSetScore !== undefined) {
        totalMatchesWithFirstSet++;

        if (
          (homeFirstSetScore > awayFirstSetScore &&
            match.homeTeam.id === playerId) ||
          (awayFirstSetScore > homeFirstSetScore &&
            match.awayTeam.id === playerId)
        ) {
          firstSetWins++;
        }
      }
    });

    if (totalMatchesWithFirstSet === 0) {
      return 0.5; // Default to 50% if no first set data is available
    }

    console.log(
      '==============================================================='
    );

    console.log(
      `${player.name} (${player.elo}) first set wins ${firstSetWins}/${totalMatchesWithFirstSet}`
    );

    console.log(
      `${player.name} (${player.elo}) first set performance: ${((firstSetWins / totalMatchesWithFirstSet) * 100).toFixed(2)}%`
    );

    return firstSetWins / totalMatchesWithFirstSet;
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

  // Method to adjust base probabilities based on recent form, surface performance, and first set performance
  private adjustProbabilities(
    baseProbabilities: { playerOneWin: number; playerTwoWin: number },
    playerOneRecentForm: number,
    playerTwoRecentForm: number,
    playerOneSurfacePerformance: number,
    playerTwoSurfacePerformance: number,
    playerOneFirstSetPerformance: number,
    playerTwoFirstSetPerformance: number
  ): {
    playerOneMatchWin: number;
    playerTwoMatchWin: number;
    playerOneFirstSetWin: number;
    playerTwoFirstSetWin: number;
  } {
    let weight = 0.7;

    const playerOneMatchWin =
      baseProbabilities.playerOneWin *
      playerOneRecentForm *
      playerOneSurfacePerformance *
      (1 + weight * (playerTwoRecentForm - 0.5));

    const playerTwoMatchWin =
      baseProbabilities.playerTwoWin *
      playerTwoRecentForm *
      playerTwoSurfacePerformance *
      (1 + weight * (1 - playerOneRecentForm));

    const normalizationFactor = playerOneMatchWin + playerTwoMatchWin;

    const playerOneFirstSetWin =
      baseProbabilities.playerOneWin *
      playerOneFirstSetPerformance *
      playerOneSurfacePerformance;
    const playerTwoFirstSetWin =
      baseProbabilities.playerTwoWin *
      playerTwoFirstSetPerformance *
      playerTwoSurfacePerformance;
    const firstSetNormalizationFactor =
      playerOneFirstSetWin + playerTwoFirstSetWin;

    return {
      playerOneMatchWin: playerOneMatchWin / normalizationFactor,
      playerTwoMatchWin: playerTwoMatchWin / normalizationFactor,
      playerOneFirstSetWin: playerOneFirstSetWin / firstSetNormalizationFactor,
      playerTwoFirstSetWin: playerTwoFirstSetWin / firstSetNormalizationFactor,
    };
  }
}
