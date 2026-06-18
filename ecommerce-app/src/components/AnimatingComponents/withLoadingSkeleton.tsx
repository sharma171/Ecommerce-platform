import React from 'react';

interface WithLoadingProps {
    isLoading: boolean;
}

export function withLoadingSkeleton<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    SkeletonComponent: React.ComponentType<any>
) {
    return function WithLoading(props: P & WithLoadingProps) {
        const { isLoading, ...rest } = props;
        if (isLoading) {
            return <SkeletonComponent {...rest} />;
        }
        return <WrappedComponent {...(rest as P)} />;
    };
}
