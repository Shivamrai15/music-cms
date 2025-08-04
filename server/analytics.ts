"use server"
import { db } from "@/lib/db";

export const getAnalyticsData = async () => {
  try {
    const [
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtists,
      activeUsers,
      lastMonthUsers
    ] = await Promise.all([
      // Current totals
      db.song.count(),
      db.user.count(),
      db.album.count(),
      db.artist.count(),
      
      // Active users (users with history in last 30 days)
      db.user.count({
        where: {
          history: {
            some: {
              createdAt: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              }
            }
          }
        }
      }),
      
      // Last month users for trend calculation
      db.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ]);

    // Calculate current month users
    const currentMonthUsers = await db.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    });

    return {
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtists,
      activeUsers,
      trends: {
        users: lastMonthUsers > 0 ? ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100 : 0,
      }
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return {
      totalSongs: 0,
      totalUsers: 0,
      totalAlbums: 0,
      totalArtists: 0,
      activeUsers: 0,
      trends: {
        users: 0,
      }
    };
  }
};

export const getNewUsersChartData = async () => {
  try {
    const last10Days = Array.from({ length: 10 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (9 - i));
      return date;
    });

    const newUsersData = await Promise.all(
      last10Days.map(async (date) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const count = await db.user.count({
          where: {
            createdAt: {
              gte: startOfDay,
              lte: endOfDay
            }
          }
        });

        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          users: count
        };
      })
    );

    return newUsersData;
  } catch (error) {
    console.error("Error fetching new users chart data:", error);
    return [];
  }
};

export const getSongListensChartData = async () => {
  try {
    const last10Days = Array.from({ length: 10 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (9 - i));
      return date;
    });

    const listensData = await Promise.all(
      last10Days.map(async (date) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const count = await db.history.count({
          where: {
            createdAt: {
              gte: startOfDay,
              lte: endOfDay
            }
          }
        });

        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          listens: count
        };
      })
    );

    return listensData;
  } catch (error) {
    console.error("Error fetching song listens chart data:", error);
    return [];
  }
};

export const getRevenueChartData = async () => {
  try {
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      return date;
    });

    const revenueData = await Promise.all(
      last12Months.map(async (date) => {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

        // Get all active subscriptions during this month
        const activeSubscriptions = await db.subscription.count({
          where: {
            AND: [
              {
                createdAt: {
                  lte: endOfMonth
                }
              },
              {
                stripeCurrentPeriodEnd: {
                  gte: startOfMonth
                }
              }
            ]
          }
        });

        // Calculate revenue with a standard price in INR
        const standardPrice = 799; // Monthly subscription price in INR (approximately $9.99)
        const monthlyRevenue = activeSubscriptions * standardPrice;

        return {
          month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          revenue: Math.round(monthlyRevenue * 100) / 100, // Round to 2 decimal places
          subscriptions: activeSubscriptions
        };
      })
    );

    return revenueData;
  } catch (error) {
    console.error("Error fetching revenue chart data:", error);
    return [];
  }
};