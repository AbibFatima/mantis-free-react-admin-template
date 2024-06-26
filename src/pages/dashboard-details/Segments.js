import React, { useState, useEffect } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import ComponentSkeleton from 'pages/components-overview/ComponentSkeleton';
import BarChartSousSeg from './BarChartSousSeg';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

const Segments = () => {
  const [segmentData, setSegmentData] = useState({
    maxChurnersTenureSegment: '',
    maxChurnersCount: 0,
    maxChurnersPercentage: 0,
    maxNonChurnersTenureSegment: '',
    maxNonChurnersCount: 0,
    maxNonChurnersPercentage: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/maxTenureSegments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSegmentData(data);
      } catch (error) {
        console.error('Error fetching tenure segments data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ComponentSkeleton>
      <Grid container rowSpacing={4.5} columnSpacing={5.75} justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <MainCard>
            <Typography variant="h6" color="textSecondary">
              Segment Tenure avec un maximum de désabonnement
            </Typography>
            <AnalyticEcommerce
              title={segmentData.maxChurnersTenureSegment}
              count={segmentData.maxChurnersCount.toString()}
              percentage={segmentData.maxChurnersPercentage}
            />
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <MainCard>
            <Typography variant="h6" color="textSecondary">
              Segment Tenure avec un maximum de non désabonnement
            </Typography>
            <AnalyticEcommerce
              title={segmentData.maxNonChurnersTenureSegment}
              count={segmentData.maxNonChurnersCount.toString()}
              percentage={segmentData.maxNonChurnersPercentage}
            />
          </MainCard>
        </Grid>
      </Grid>

      <MainCard sx={{ mt: 1.75 }}>
        <Grid item xs={12}>
          <Stack justifyContent="center" alignItems="center">
            <Typography variant="h3">Répartition des clients churners/non churners sur les sous</Typography>
          </Stack>
          <BarChartSousSeg />
        </Grid>
      </MainCard>
    </ComponentSkeleton>
  );
};

export default Segments;
