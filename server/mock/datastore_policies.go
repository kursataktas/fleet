// Automatically generated by mockimpl. DO NOT EDIT!

package mock

import (
	"time"

	"github.com/fleetdm/fleet/v4/server/fleet"
)

var _ fleet.GlobalPoliciesStore = (*GlobalPoliciesStore)(nil)

type NewGlobalPolicyFunc func(queryID uint) (*fleet.Policy, error)

type PolicyFunc func(id uint) (*fleet.Policy, error)

type RecordPolicyQueryExecutionsFunc func(host *fleet.Host, results map[uint]*bool, updated time.Time) error

type ListGlobalPoliciesFunc func() ([]*fleet.Policy, error)

type DeleteGlobalPoliciesFunc func(ids []uint) ([]uint, error)

type PolicyQueriesForHostFunc func(host *fleet.Host) (map[string]string, error)

type GlobalPoliciesStore struct {
	NewGlobalPolicyFunc        NewGlobalPolicyFunc
	NewGlobalPolicyFuncInvoked bool

	PolicyFunc        PolicyFunc
	PolicyFuncInvoked bool

	RecordPolicyQueryExecutionsFunc        RecordPolicyQueryExecutionsFunc
	RecordPolicyQueryExecutionsFuncInvoked bool

	ListGlobalPoliciesFunc        ListGlobalPoliciesFunc
	ListGlobalPoliciesFuncInvoked bool

	DeleteGlobalPoliciesFunc        DeleteGlobalPoliciesFunc
	DeleteGlobalPoliciesFuncInvoked bool

	PolicyQueriesForHostFunc        PolicyQueriesForHostFunc
	PolicyQueriesForHostFuncInvoked bool
}

func (s *GlobalPoliciesStore) NewGlobalPolicy(queryID uint) (*fleet.Policy, error) {
	s.NewGlobalPolicyFuncInvoked = true
	return s.NewGlobalPolicyFunc(queryID)
}

func (s *GlobalPoliciesStore) Policy(id uint) (*fleet.Policy, error) {
	s.PolicyFuncInvoked = true
	return s.PolicyFunc(id)
}

func (s *GlobalPoliciesStore) RecordPolicyQueryExecutions(host *fleet.Host, results map[uint]*bool, updated time.Time) error {
	s.RecordPolicyQueryExecutionsFuncInvoked = true
	return s.RecordPolicyQueryExecutionsFunc(host, results, updated)
}

func (s *GlobalPoliciesStore) ListGlobalPolicies() ([]*fleet.Policy, error) {
	s.ListGlobalPoliciesFuncInvoked = true
	return s.ListGlobalPoliciesFunc()
}

func (s *GlobalPoliciesStore) DeleteGlobalPolicies(ids []uint) ([]uint, error) {
	s.DeleteGlobalPoliciesFuncInvoked = true
	return s.DeleteGlobalPoliciesFunc(ids)
}

func (s *GlobalPoliciesStore) PolicyQueriesForHost(host *fleet.Host) (map[string]string, error) {
	s.PolicyQueriesForHostFuncInvoked = true
	return s.PolicyQueriesForHostFunc(host)
}
