import React from 'react';
import { Modal } from '../../../shared/components/ui/Modal';
import Button from '../../../shared/components/ui/Button'; // Assuming you have this from Step 1
import InputGroup from '../../../shared/components/ui/InputGroup'; // Assuming you have this from Step 1

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Time Off Request">
      <form className="space-y-4">
        {/* Read Only Name */}
        <div>
          <label className="block text-hr-muted text-xs mb-1">Employee</label>
          <div className="bg-hr-bg border border-hr-border rounded px-3 py-2 text-hr-text text-sm">
            Anshkumar Darji
          </div>
        </div>

        <div>
          <label className="block text-hr-muted text-xs mb-1">Time Off Type</label>
          <select className="w-full bg-hr-input border border-hr-border text-hr-text text-sm rounded px-3 py-2 outline-none focus:border-hr-primary">
            <option>Paid Time Off</option>
            <option>Sick Leave</option>
            <option>Unpaid Leave</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <InputGroup label="Start Date" type="date" name="start" value="" onChange={() => {}} />
           <InputGroup label="End Date" type="date" name="end" value="" onChange={() => {}} />
        </div>

        <div>
          <label className="block text-hr-muted text-xs mb-1">Reason / Attachment</label>
          <div className="border border-dashed border-hr-border rounded-lg p-6 text-center text-sm text-hr-muted hover:bg-hr-border/20 cursor-pointer transition">
             Click to upload medical certificate (if applicable)
          </div>
        </div>

        <div className="pt-2">
          <Button onClick={onClose} className="w-full">Submit Request</Button>
        </div>
      </form>
    </Modal>
  );
};