'use client';

import React, { useState } from 'react';
import { usePortal } from '@/context/PortalContext';
import { TaskItem, TaskStatus, TaskPriority } from '@/types';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  MapPin,
  AlertTriangle,
  Sparkles,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Upload,
  UserCheck,
  Building,
  Image,
  Award,
  Layers,
  FileCheck2,
  X
} from 'lucide-react';

export const UniversalTaskCenterView: React.FC = () => {
  const {
    tasks,
    currentOrg,
    acceptTask,
    rejectTask,
    assignTaskTeam,
    updateTaskStatus,
    submitTaskProof,
    verifyTaskAction,
    createTask
  } = usePortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  // Active Modals
  const [selectedTaskForProof, setSelectedTaskForProof] = useState<TaskItem | null>(null);
  const [selectedTaskForAssign, setSelectedTaskForAssign] = useState<TaskItem | null>(null);
  const [selectedTaskForDetails, setSelectedTaskForDetails] = useState<TaskItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states for modals
  const [proofNotes, setProofNotes] = useState('');
  const [proofPhotoUrl, setProofPhotoUrl] = useState('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60');
  const [weighbridgeKg, setWeighbridgeKg] = useState<number>(320);

  const [assignTeamName, setAssignTeamName] = useState('Quick Action Sanitation Squad 04');

  // Create Task Form State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Waste Pickup & Segregation');
  const [newTaskLocation, setNewTaskLocation] = useState('Palasia Square, Ward 22');
  const [newTaskZone, setNewTaskZone] = useState('Zone 5 (Palasia)');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('medium');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskKg, setNewTaskKg] = useState<number>(200);

  // Filtering
  const filteredTasks = tasks.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskForProof) return;
    submitTaskProof(selectedTaskForProof.id, {
      photos: [proofPhotoUrl],
      notes: proofNotes || 'Task completed on ground per SOP standards.',
      weighbridgeSlipKg: Number(weighbridgeKg)
    });
    setSelectedTaskForProof(null);
    setProofNotes('');
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskForAssign) return;
    assignTaskTeam(selectedTaskForAssign.id, assignTeamName);
    setSelectedTaskForAssign(null);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTask({
      title: newTaskTitle,
      category: newTaskCategory,
      location: newTaskLocation,
      zone: newTaskZone,
      priority: newTaskPriority,
      description: newTaskDesc || 'Citizen request verified by authority intake.',
      estimatedWasteKg: Number(newTaskKg)
    });
    setShowCreateModal(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const kanbanColumns: { status: TaskStatus; label: string; color: string }[] = [
    { status: 'new', label: 'New Inbound', color: 'border-blue-500' },
    { status: 'accepted', label: 'Accepted', color: 'border-cyan-500' },
    { status: 'in_progress', label: 'In Progress', color: 'border-amber-500' },
    { status: 'awaiting_verification', label: 'Awaiting Proof Verification', color: 'border-purple-500' },
    { status: 'completed', label: 'Completed & Rewarded', color: 'border-emerald-500' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ClipboardList className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">Universal Task Center</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Receive, accept, allocate teams, and verify proof of action for environmental operations across ECO-SMART.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-200 p-0.5 rounded-lg flex text-xs font-semibold">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md transition ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-md transition ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              Kanban Board
            </button>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, location, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-slate-300 rounded-md pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-300 rounded-md px-2.5 py-1.5 bg-white font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="accepted">Accepted</option>
              <option value="in_progress">In Progress</option>
              <option value="awaiting_verification">Awaiting Verification</option>
              <option value="completed">Completed</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-500">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-slate-300 rounded-md px-2.5 py-1.5 bg-white font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* VIEW: LIST */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Task ID & Details</th>
                  <th className="p-3.5">Category & Zone</th>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5">Assigned Entity & Team</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">SLA / Timeline</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      No tasks found matching current filters.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map(task => (
                    <tr key={task.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5">
                        <div className="font-mono font-bold text-slate-900">{task.id}</div>
                        <div className="font-semibold text-slate-800 text-xs mt-0.5">{task.title}</div>
                        <div className="text-[11px] text-slate-500">📍 {task.location}</div>
                        {task.aiRecommendation && (
                          <div className="mt-1 inline-flex items-center space-x-1 text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>AI Match: {task.aiRecommendation.capabilityMatch}% ({task.aiRecommendation.distanceKm} km away)</span>
                          </div>
                        )}
                      </td>

                      <td className="p-3.5">
                        <span className="font-semibold text-slate-800">{task.category}</span>
                        <div className="text-[11px] text-slate-500">{task.zone}</div>
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          task.priority === 'critical'
                            ? 'bg-red-100 text-red-700'
                            : task.priority === 'high'
                            ? 'bg-amber-100 text-amber-700'
                            : task.priority === 'medium'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {task.priority}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800 truncate max-w-[180px]">
                          {task.assignedOrgName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {task.assignedTeam || 'Team unassigned'}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          task.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : task.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : task.status === 'awaiting_verification'
                            ? 'bg-purple-100 text-purple-800'
                            : task.status === 'escalated'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-medium text-slate-700">{task.deadline}</div>
                        <div className="text-[10px] text-slate-400">{task.reportedAt}</div>
                      </td>

                      <td className="p-3.5 text-right space-x-1.5">
                        {task.status === 'new' && (
                          <>
                            <button
                              onClick={() => acceptTask(task.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold transition shadow-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => rejectTask(task.id)}
                              className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[11px] font-semibold transition"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {task.status === 'accepted' && (
                          <button
                            onClick={() => setSelectedTaskForAssign(task)}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-bold transition"
                          >
                            Assign Team
                          </button>
                        )}

                        {task.status === 'in_progress' && (
                          <button
                            onClick={() => setSelectedTaskForProof(task)}
                            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-[11px] font-bold transition flex items-center space-x-1 ml-auto"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload Proof</span>
                          </button>
                        )}

                        {task.status === 'awaiting_verification' && (
                          <button
                            onClick={() => verifyTaskAction(task.id)}
                            className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[11px] font-bold transition"
                          >
                            Verify Action ✓
                          </button>
                        )}

                        {task.status === 'completed' && (
                          <span className="text-emerald-600 font-bold text-[11px]">
                            ✓ Reward Issued
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW: KANBAN */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {kanbanColumns.map(col => {
            const colTasks = tasks.filter(t => t.status === col.status);
            return (
              <div key={col.status} className="bg-slate-100/70 rounded-xl p-3 border border-slate-200 flex flex-col min-h-[400px]">
                <div className={`border-t-4 ${col.color} bg-white p-2.5 rounded-lg shadow-sm mb-3 flex items-center justify-between`}>
                  <span className="font-bold text-xs text-slate-800">{col.label}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {colTasks.map(task => (
                    <div key={task.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm space-y-2 text-xs hover:shadow transition">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[10px] text-slate-500">{task.id}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                          task.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 leading-snug">{task.title}</h4>
                      <p className="text-[11px] text-slate-500">📍 {task.location}</p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Reward: {task.citizenRewardPoints} pts</span>
                        {task.status === 'in_progress' && (
                          <button
                            onClick={() => setSelectedTaskForProof(task)}
                            className="px-2 py-0.5 bg-amber-600 text-white rounded font-bold text-[10px]"
                          >
                            Proof
                          </button>
                        )}
                        {task.status === 'awaiting_verification' && (
                          <button
                            onClick={() => verifyTaskAction(task.id)}
                            className="px-2 py-0.5 bg-purple-600 text-white rounded font-bold text-[10px]"
                          >
                            Verify
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PROOF OF ACTION MODAL */}
      {selectedTaskForProof && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden text-slate-800 text-xs">
            <div className="bg-[#0b192e] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Upload Proof of Action</h3>
                <p className="text-[11px] text-slate-400">Task #{selectedTaskForProof.id}</p>
              </div>
              <button onClick={() => setSelectedTaskForProof(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProofSubmit} className="p-5 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Photo Evidence URL (Ground Action Proof)</label>
                <input
                  type="text"
                  value={proofPhotoUrl}
                  onChange={(e) => setProofPhotoUrl(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2"
                />
                <div className="mt-2 h-28 rounded-lg overflow-hidden border border-slate-200 relative">
                  <img src={proofPhotoUrl} alt="Proof" className="w-full h-full object-cover" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Weighbridge / Gate Slip Net Weight (kg)</label>
                <input
                  type="number"
                  value={weighbridgeKg}
                  onChange={(e) => setWeighbridgeKg(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Operational & Segregation Notes</label>
                <textarea
                  rows={3}
                  value={proofNotes}
                  onChange={(e) => setProofNotes(e.target.value)}
                  placeholder="Details of vehicle dispatch, sorting yield, and RDF transfer..."
                  className="w-full border border-slate-300 rounded-md p-2"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded p-2.5 text-emerald-800 text-[11px] flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>GPS coordinates stamped automatically: [22.7196, 75.8577]</span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTaskForProof(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded shadow-sm"
                >
                  Submit Proof of Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ASSIGN TEAM MODAL */}
      {selectedTaskForAssign && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-slate-800 text-xs">
            <div className="bg-[#0b192e] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Assign Field Operational Team</h3>
              <button onClick={() => setSelectedTaskForAssign(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="p-5 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select / Input Unit Name</label>
                <input
                  type="text"
                  value={assignTeamName}
                  onChange={(e) => setAssignTeamName(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2"
                />
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-600">
                <p className="font-semibold text-slate-700">Quick Select Unit:</p>
                {['Night Quick Response Unit Alpha 4', 'Bio-Waste Tipper Crew 02', 'Hazmat Emergency Truck 03', 'Student Volunteer Brigade #1'].map(unit => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setAssignTeamName(unit)}
                    className="w-full text-left p-2 rounded border border-slate-200 hover:bg-slate-50 transition"
                  >
                    🚛 {unit}
                  </button>
                ))}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTaskForAssign(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-sm"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TASK MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden text-slate-800 text-xs">
            <div className="bg-[#0b192e] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Create New Environmental Task</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-5 space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Commercial Dry Plastic Clean & Weigh"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-md p-2 bg-white"
                  >
                    <option>Waste Pickup & Segregation</option>
                    <option>E-Waste Takeback</option>
                    <option>Environmental Inspection</option>
                    <option>Community Campaign</option>
                    <option>Data Verification</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
                    className="w-full border border-slate-300 rounded-md p-2 bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location / Street</label>
                  <input
                    type="text"
                    value={newTaskLocation}
                    onChange={(e) => setNewTaskLocation(e.target.value)}
                    className="w-full border border-slate-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Municipal Zone</label>
                  <input
                    type="text"
                    value={newTaskZone}
                    onChange={(e) => setNewTaskZone(e.target.value)}
                    className="w-full border border-slate-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Estimated Waste (kg)</label>
                <input
                  type="number"
                  value={newTaskKg}
                  onChange={(e) => setNewTaskKg(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description & Instructions</label>
                <textarea
                  rows={2}
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  placeholder="Task instructions..."
                  className="w-full border border-slate-300 rounded-md p-2"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-sm"
                >
                  Create & Route Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
